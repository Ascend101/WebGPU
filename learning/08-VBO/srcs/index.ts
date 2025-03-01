/// <reference types="@webgpu/types" />
//Pas oublier cette ligne pour les types/fonctions webgpu

import {Renderer} from "./renderer";

const canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("screen");

const renderer = new Renderer(canvas);

renderer.Initialize();
