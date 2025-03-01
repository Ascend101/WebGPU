/// <reference types="@webgpu/types" />
//Pas oublier cette ligne pour les types/fonctions webgpu

import shader from "./square.wgsl";

let pipeline : GPURenderPipeline;

async function Initialize() {
  const canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("screen");
  const width = canvas.clientWidth;//1
  const height = canvas.clientHeight;//2
  const gpuAdapt = await navigator.gpu?.requestAdapter();
  const device : GPUDevice = <GPUDevice>await gpuAdapt?.requestDevice();
  canvas.width = Math.max(1, Math.min(width, device.limits.maxTextureDimension2D));//3
  canvas.height = Math.max(1, Math.min(height, device.limits.maxTextureDimension2D));//4
  //On fait ça parce que la résolution du canva reste inchangée après resize dans le css
  //Normalement on utilise un resize observer mais là l'image est statique ça n'est pas nécessaire
  const ctx : GPUCanvasContext = <GPUCanvasContext> canvas.getContext("webgpu");
  const format : GPUTextureFormat = "bgra8unorm";

  ctx.configure({device:device, format:format, alphaMode:"premultiplied"});  
  pipeline = device.createRenderPipeline({
    layout:"auto",
    vertex:{
      module:device.createShaderModule({
        code:shader
      }),
      entryPoint:"vs_main"
    },
    fragment:{
      module:device.createShaderModule({
        code:shader
      }),
      entryPoint:"fs_main",
      targets:[{format:format}]
    },
    primitive:{topology:"triangle-list"}
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
  renderPass.draw(6, 1, 0, 0);
  renderPass.end();
  device.queue.submit([commandEncoder.finish()]);
}

Initialize();