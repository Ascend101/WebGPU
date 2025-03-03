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
  nb_rect : number;
  uniforms : Record<string,any>[];
  vboCarre !: SuperMesh;
  //Rendu
  renderPass!:GPURenderPassEncoder;

  constructor(canvas:HTMLCanvasElement, ct:number){
    this.canvas = canvas;
    this.width = canvas.clientWidth;//1
    this.height = canvas.clientHeight;//2
    this.aspect = this.width / this.height;
    this.ctx = <GPUCanvasContext>this.canvas.getContext("webgpu");
    this.format = "bgra8unorm";
    this.lt = ct;
    this.nb_rect = 100;
    this.uniforms = [];
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

    for (let i = 0; i < this.nb_rect; i++){
      //Buffer unitaire
      let uniformBuffer = this.device.createBuffer({
        label: `uniform obj:${i}`,
        size:24,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      //fenêtre pour buffer unitaire
      let uniformValues = new ArrayBuffer(24);
      let uniformViews = {
        tps: new Float32Array(uniformValues, 0, 1),
        scale: new Float32Array(uniformValues, 8, 2),
        offset: new Float32Array(uniformValues, 16, 2)
      };
      uniformViews.offset.set([Math.random()*2-1.0, Math.random()*2-1.0]);
      // AFFECTATION A UN GROUPE DE LIEN POUR LE SHADER
      let bindGroup = this.device.createBindGroup({
        label:`bind group for uniform obj : ${i}`,
        layout: this.pipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: uniformBuffer }},
        ],
      });
      this.uniforms.push({
        buffer : uniformBuffer,
        values : uniformValues,
        view : uniformViews,
        bindgroup : bindGroup,
        scale: Math.random()*0.1
      });
    }
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

    let textureView : GPUTextureView = this.ctx.getCurrentTexture().createView();
    //Encoder la renderpass sur laquelle on va écrire nos instructions au GPU
    let commandEncoder:GPUCommandEncoder = this.device.createCommandEncoder();
    this.renderPass = commandEncoder.beginRenderPass({
      colorAttachments:[{
        view:textureView,
        clearValue:{r:0.0, g:0.0, b:0.0, a:0.0},
        loadOp:"clear",
        storeOp:"store"
      }]
    });
    this.renderPass.setPipeline(this.pipeline);

    for (const {buffer, values, view, bindgroup, scale} of this.uniforms){
      view.tps.set([this.lt * 0.001]);
      view.scale.set([scale/this.aspect, scale]);
      this.device.queue.writeBuffer(buffer, 0, values);
      this.renderPass.setBindGroup(0, bindgroup);
      //Envoyer l'ordre de dessin et end l'instruction
      this.renderPass.setVertexBuffer(0, this.vboCarre.buffer);
      this.renderPass.draw(4, 1);
    }
    //fin de la passe après tous les draw
    this.renderPass.end();
    //Envoyer la commande
    this.device.queue.submit([commandEncoder.finish()]);
  }
}