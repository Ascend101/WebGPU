import shader from "./square.wgsl";
import { SuperMesh } from "./mesh";

export class Renderer{
  //DOM
  canvas:HTMLCanvasElement;
  width:number;
  height:number;
  ctx : GPUCanvasContext;
  aspect !:number;
  lt :number;
  dt !: number;
  //GPU
  format : GPUTextureFormat;
  device !: GPUDevice;
  pipeline !: GPURenderPipeline;
  //DATA
  vboCarre !: SuperMesh;
  uniformBuffer !: GPUBuffer;
  uniformValues !: ArrayBuffer;
  uniformViews !: any;//type fourre tout
  //Rendu
  renderPass!:GPURenderPassEncoder;
  bindGroup!:GPUBindGroup;

  constructor(canvas:HTMLCanvasElement, ct:number){
    this.canvas = canvas;
    this.width = canvas.clientWidth;//1
    this.height = canvas.clientHeight;//2
    this.aspect = this.width / this.height;
    this.ctx = <GPUCanvasContext>this.canvas.getContext("webgpu");
    this.format = "bgra8unorm";
    this.lt = ct;
  }

  async Initialize() {
    const gpuAdapt = await navigator.gpu?.requestAdapter();
    this.device = <GPUDevice>await gpuAdapt?.requestDevice();
    this.canvas.width = Math.max(1, Math.min(this.width, this.device.limits.maxTextureDimension2D));//3
    this.canvas.height = Math.max(1, Math.min(this.height, this.device.limits.maxTextureDimension2D));//4
    
    //On fait ça parce que la résolution du canva reste inchangée après resize dans le css
    //Normalement on utilise un resize observer mais là l'image est statique ça n'est pas nécessaire
    this.ctx.configure({device:this.device, format:this.format, alphaMode:"premultiplied"});

    //VBO
    this.vboCarre = new SuperMesh(this.device);

    this.pipeline = this.device.createRenderPipeline({
      layout:"auto",
      vertex:{
        module:this.device.createShaderModule({
          code:shader
        }),
        entryPoint:"vs_main",
        buffers:[this.vboCarre.bufferLayout]
      },
      fragment:{
        module:this.device.createShaderModule({
          code:shader
        }),
        entryPoint:"fs_main",
        targets:[{format:this.format}]
      },
      primitive:{topology:"triangle-strip"}
    });

    //UNIFORM ALLOCATION MEMOIRE
    this.uniformBuffer = this.device.createBuffer({
      size:16,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    
    this.uniformValues = new ArrayBuffer(16);
    this.uniformViews = {
      tps: new Float32Array(this.uniformValues, 0, 1),
      scale: new Float32Array(this.uniformValues, 8, 2)
    };
    // AFFECTATION A UN GROUPE DE LIEN POUR LE SHADER
    this.bindGroup = this.device.createBindGroup({
      layout: this.pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.uniformBuffer }},
      ],
    });
  }
  Resize(){
    this.width = this.canvas.clientWidth;//1
    this.height = this.canvas.clientHeight;//2
    this.aspect = this.width / this.height;
    this.ctx.configure({device:this.device, format:this.format, alphaMode:"premultiplied"});

  }
  Draw(tps:number){
    this.dt = (tps - this.lt) * 0.01;
    this.lt = tps;
    //ON AJOUTE L'ECRITURE DU BUFFER A LA QUEUE
    this.uniformViews.tps.set([this.lt * 0.001]);
    this.uniformViews.scale.set([0.5 / this.aspect, 0.5]);
    this.device.queue.writeBuffer(this.uniformBuffer, 0, this.uniformValues);

    const textureView : GPUTextureView = this.ctx.getCurrentTexture().createView();
    const commandEncoder:GPUCommandEncoder = this.device.createCommandEncoder();
    this.renderPass = commandEncoder.beginRenderPass({
      colorAttachments:[{
        view:textureView,
        clearValue:{r:0.0, g:0.0, b:0.0, a:0.0},
        loadOp:"clear",
        storeOp:"store"
      }]
    });
    this.renderPass.setPipeline(this.pipeline);
    this.renderPass.setVertexBuffer(0, this.vboCarre.buffer);
    this.renderPass.setBindGroup(0, this.bindGroup);
    this.renderPass.draw(4, 1, 0, 0);
    this.renderPass.end();
    this.device.queue.submit([commandEncoder.finish()]);
  }
}