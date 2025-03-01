/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./srcs/index.ts":
/*!***********************!*\
  !*** ./srcs/index.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ \"./srcs/renderer.ts\");\n/// <reference types=\"@webgpu/types\" />\n//Pas oublier cette ligne pour les types/fonctions webgpu\n\nconst canvas = document.getElementById(\"screen\");\nconst renderer = new _renderer__WEBPACK_IMPORTED_MODULE_0__.Renderer(canvas);\nrenderer.Initialize();\n\n\n//# sourceURL=webpack://04/./srcs/index.ts?");

/***/ }),

/***/ "./srcs/mesh.ts":
/*!**********************!*\
  !*** ./srcs/mesh.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SuperMesh: () => (/* binding */ SuperMesh)\n/* harmony export */ });\nclass SuperMesh {\n    constructor(device) {\n        //\n        const vertices = new Float32Array([\n            -0.5, 0.5, 0.0, 1.0, 1.0, //tl\n            -0.5, -0.5, 1.0, 0.0, 1.0, //bl\n            0.5, 0.5, 1.0, 1.0, 0.0, //tr\n            0.5, -0.5, 0.0, 0.36, 1.0 //br\n        ]);\n        const usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;\n        const descriptor = {\n            size: vertices.byteLength,\n            usage: usage,\n            mappedAtCreation: true\n        };\n        this.buffer = device.createBuffer(descriptor);\n        new Float32Array(this.buffer.getMappedRange()).set(vertices);\n        this.buffer.unmap();\n        this.bufferLayout = {\n            arrayStride: 20,\n            attributes: [\n                {\n                    shaderLocation: 0,\n                    format: \"float32x2\",\n                    offset: 0\n                },\n                {\n                    shaderLocation: 1,\n                    format: \"float32x3\",\n                    offset: 8 //2 float = 8bytes \n                }\n            ]\n        };\n    }\n}\n\n\n//# sourceURL=webpack://04/./srcs/mesh.ts?");

/***/ }),

/***/ "./srcs/renderer.ts":
/*!**************************!*\
  !*** ./srcs/renderer.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Renderer: () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _square_wgsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./square.wgsl */ \"./srcs/square.wgsl\");\n/* harmony import */ var _mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mesh */ \"./srcs/mesh.ts\");\n\n\nclass Renderer {\n    constructor(canvas) {\n        this.canvas = canvas;\n    }\n    async Initialize() {\n        let pipeline;\n        const width = this.canvas.clientWidth; //1\n        const height = this.canvas.clientHeight; //2\n        const gpuAdapt = await navigator.gpu?.requestAdapter();\n        const device = await gpuAdapt?.requestDevice();\n        this.canvas.width = Math.max(1, Math.min(width, device.limits.maxTextureDimension2D)); //3\n        this.canvas.height = Math.max(1, Math.min(height, device.limits.maxTextureDimension2D)); //4\n        //On fait ça parce que la résolution du canva reste inchangée après resize dans le css\n        //Normalement on utilise un resize observer mais là l'image est statique ça n'est pas nécessaire\n        const ctx = this.canvas.getContext(\"webgpu\");\n        const format = \"bgra8unorm\";\n        ctx.configure({ device: device, format: format, alphaMode: \"premultiplied\" });\n        const superMesh = new _mesh__WEBPACK_IMPORTED_MODULE_1__.SuperMesh(device);\n        pipeline = device.createRenderPipeline({\n            layout: \"auto\",\n            vertex: {\n                module: device.createShaderModule({\n                    code: _square_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n                }),\n                entryPoint: \"vs_main\",\n                buffers: [superMesh.bufferLayout]\n            },\n            fragment: {\n                module: device.createShaderModule({\n                    code: _square_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n                }),\n                entryPoint: \"fs_main\",\n                targets: [{ format: format }]\n            },\n            primitive: { topology: \"triangle-strip\" }\n        });\n        const textureView = ctx.getCurrentTexture().createView();\n        const commandEncoder = device.createCommandEncoder();\n        const renderPass = commandEncoder.beginRenderPass({\n            colorAttachments: [{\n                    view: textureView,\n                    clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },\n                    loadOp: \"clear\",\n                    storeOp: \"store\"\n                }]\n        });\n        renderPass.setPipeline(pipeline);\n        renderPass.setVertexBuffer(0, superMesh.buffer);\n        renderPass.draw(4, 1, 0, 0);\n        renderPass.end();\n        device.queue.submit([commandEncoder.finish()]);\n    }\n}\n\n\n//# sourceURL=webpack://04/./srcs/renderer.ts?");

/***/ }),

/***/ "./srcs/square.wgsl":
/*!**************************!*\
  !*** ./srcs/square.wgsl ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"struct Fragment{\\n  @builtin(position) pos:vec4f,\\n  @location(0) interpolated:vec4f,\\n}\\n\\n@vertex\\nfn vs_main(@location(0) vx_pos : vec2<f32>, @location(1) vx_col: vec3<f32>) -> Fragment {  // (2) `v_id` holds the index of the vertex WebGPU is processing\\n  var outFrag:Fragment;\\n  outFrag.pos = vec4f(vx_pos, 0.0, 1.0);\\n  outFrag.interpolated = vec4f(vx_col, 1.0);\\n  return outFrag;\\n}\\n\\n@fragment\\nfn fs_main(outFrag:Fragment) -> @location(0) vec4<f32> {\\n  return outFrag.interpolated;\\n}\\n\");\n\n//# sourceURL=webpack://04/./srcs/square.wgsl?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./srcs/index.ts");
/******/ 	
/******/ })()
;