import shader from "./square.wgsl";
import { SuperMesh } from "./mesh";

export class Renderer{
  canvas:HTMLCanvasElement;

  constructor(canvas:HTMLCanvasElement){
    this.canvas = canvas;
  }

  async Initialize() {
    let pipeline : GPURenderPipeline;
    const width = this.canvas.clientWidth;//1
    const height = this.canvas.clientHeight;//2
    const gpuAdapt = await navigator.gpu?.requestAdapter();
    const device : GPUDevice = <GPUDevice>await gpuAdapt?.requestDevice();
    this.canvas.width = Math.max(1, Math.min(width, device.limits.maxTextureDimension2D));//3
    this.canvas.height = Math.max(1, Math.min(height, device.limits.maxTextureDimension2D));//4
    //On fait ça parce que la résolution du canva reste inchangée après resize dans le css
    //Normalement on utilise un resize observer mais là l'image est statique ça n'est pas nécessaire
    const ctx : GPUCanvasContext = <GPUCanvasContext> this.canvas.getContext("webgpu");
    const format : GPUTextureFormat = "bgra8unorm";

    ctx.configure({device:device, format:format, alphaMode:"premultiplied"});  

    const superMesh = new SuperMesh(device);

    pipeline = device.createRenderPipeline({
      layout:"auto",
      vertex:{
        module:device.createShaderModule({
          code:shader
        }),
        entryPoint:"vs_main",
        buffers:[superMesh.bufferLayout]
      },
      fragment:{
        module:device.createShaderModule({
          code:shader
        }),
        entryPoint:"fs_main",
        targets:[{format:format}]
      },
      primitive:{topology:"triangle-strip"}
    });
    const textureView : GPUTextureView = ctx.getCurrentTexture().createView();
    const commandEncoder:GPUCommandEncoder = device.createCommandEncoder();
    const renderPass:GPURenderPassEncoder = commandEncoder.beginRenderPass({
      colorAttachments:[{
        view:textureView,
        clearValue:{r:0.0, g:0.0, b:0.0, a:0.0},
        loadOp:"clear",
        storeOp:"store"
      }]
    });
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, superMesh.buffer);
    renderPass.draw(4, 1, 0, 0);
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);
  }
}