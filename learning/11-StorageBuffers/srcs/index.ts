/// <reference types="@webgpu/types" />
//Pas oublier cette ligne pour les types/fonctions webgpu

import {Renderer} from "./renderer";

let canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("screen");

let renderer = new Renderer(canvas, performance.now());
await renderer.Initialize();

let observer = new ResizeObserver(()=>{
  renderer.Resize();
});
observer.observe(canvas);

function renderLoop(){
  renderer.Draw(performance.now());
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);
