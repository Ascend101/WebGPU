/// <reference types="@webgpu/types" />

import shader from "./shader.wgsl";

const Initialize = async() => {
  //J'essaie dans mes mots d'expliciter les commandes, tout n'est pas parfaitement correct mais ça me permet de développer un modèle de compréhension basique et d'avancer
  const canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("gfx-main");//On récupère le canvas sur lequel on va dessiner
  const adapter : GPUAdapter = <GPUAdapter>await navigator.gpu?.requestAdapter();//On vérifie que l'interface GPU nous fournit un adaptateur
  const device : GPUDevice = <GPUDevice> await adapter?.requestDevice();//On récupère la référence matérielle du GPU
  const context : GPUCanvasContext = <GPUCanvasContext> canvas.getContext("webgpu");//On définie le contexte dans lequel le canvas sera utilisé
  const format : GPUTextureFormat = "bgra8unorm";//Format de couleur des textures

  context.configure({
    device:device,
    format:format,
    alphaMode:"premultiplied"
  });//Configuration du contexte

  const pipeline: GPURenderPipeline = device.createRenderPipeline({
    layout: "auto",//Arrangement automatique de la pipeline
    vertex: {//vertex shader
      module : device.createShaderModule({
        code:shader
      }),
      entryPoint : "vs_main"//fonction d'entrée dans le vertex shader
    },
    fragment: {//fragment shader
      module : device.createShaderModule({
        code: shader
      }),
      entryPoint: "fs_main",//fonction d'entrée dans le fragment shader
      targets: [{
        format:format//format couleur fs
      }]
    },
    primitive: {
      topology: "triangle-list"//Manière selon laquelle seront rasterizés les sommets ?
    }
  });

  const textureView : GPUTextureView = context.getCurrentTexture().createView();//Prends la texture actuelle pour l'éditer
  //Crée un commandEncoder, qui correspond à une sorte de todolist pour la CG, avec WebGPU on envoie les commandes en batch (lots)
  const commandEncoder : GPUCommandEncoder = device.createCommandEncoder();
  //Définition de la passe de rendu qu'on va envoyer à travers commandEncoder
  const renderpass : GPURenderPassEncoder = commandEncoder.beginRenderPass({
    colorAttachments: [{//Couleur d'effacement + texture qu'on édite + mode d'effacement frame précédente et actuelle
      view: textureView,
      clearValue: {r:0.0, g:0.0, b:0.0, a:0.0},
      loadOp: "clear",
      storeOp: "store"
    }]
  });
  renderpass.setPipeline(pipeline);//on définie la pipeline préalablement faite sur cette passe de rendu
  renderpass.draw(3, 1, 0, 0);//(nb_vertex, nb_instance=1, offset_vertex=0, first_instance=0)
  renderpass.end();//Fermeture de la passe de rendu

  const finishedCommandEncoder : GPUCommandBuffer = commandEncoder.finish();//Fin du commandEncoder
  device.queue.submit([finishedCommandEncoder]);//Envoi à la liste des instructions qui doivent être traitées par le GPU
}

Initialize();