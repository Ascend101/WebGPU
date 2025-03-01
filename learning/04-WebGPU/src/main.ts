/// <reference types="@webgpu/types" />

const output : HTMLElement = <HTMLElement> document.getElementById("comp-check");

if (navigator.gpu) {
  output.innerHTML = "Le navigateur supporte WebGPU"
}
else {
  output.innerHTML = "Le navigateur ne supporte pas WebGPU"
}