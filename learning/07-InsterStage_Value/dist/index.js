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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _square_wgsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./square.wgsl */ \"./srcs/square.wgsl\");\n/// <reference types=\"@webgpu/types\" />\n//Pas oublier cette ligne pour les types/fonctions webgpu\n\nlet pipeline;\nasync function Initialize() {\n    const canvas = document.getElementById(\"screen\");\n    const width = canvas.clientWidth; //1\n    const height = canvas.clientHeight; //2\n    const gpuAdapt = await navigator.gpu?.requestAdapter();\n    const device = await gpuAdapt?.requestDevice();\n    canvas.width = Math.max(1, Math.min(width, device.limits.maxTextureDimension2D)); //3\n    canvas.height = Math.max(1, Math.min(height, device.limits.maxTextureDimension2D)); //4\n    //On fait ça parce que la résolution du canva reste inchangée après resize dans le css\n    //Normalement on utilise un resize observer mais là l'image est statique ça n'est pas nécessaire\n    const ctx = canvas.getContext(\"webgpu\");\n    const format = \"bgra8unorm\";\n    ctx.configure({ device: device, format: format, alphaMode: \"premultiplied\" });\n    pipeline = device.createRenderPipeline({\n        layout: \"auto\",\n        vertex: {\n            module: device.createShaderModule({\n                code: _square_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n            }),\n            entryPoint: \"vs_main\"\n        },\n        fragment: {\n            module: device.createShaderModule({\n                code: _square_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n            }),\n            entryPoint: \"fs_main\",\n            targets: [{ format: format }]\n        },\n        primitive: { topology: \"triangle-list\" }\n    });\n    const textureView = ctx.getCurrentTexture().createView();\n    const commandEncoder = device.createCommandEncoder();\n    const renderPass = commandEncoder.beginRenderPass({\n        colorAttachments: [{\n                view: textureView,\n                clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },\n                loadOp: \"clear\",\n                storeOp: \"store\"\n            }]\n    });\n    renderPass.setPipeline(pipeline);\n    renderPass.draw(6, 1, 0, 0);\n    renderPass.end();\n    device.queue.submit([commandEncoder.finish()]);\n}\nInitialize();\n\n\n//# sourceURL=webpack://04/./srcs/index.ts?");

/***/ }),

/***/ "./srcs/square.wgsl":
/*!**************************!*\
  !*** ./srcs/square.wgsl ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"struct Fragment{\\n  @builtin(position) pos:vec4f,\\n  @location(0) interpolated:vec4f,\\n}\\n\\n@vertex\\nfn vs_main(@builtin(vertex_index) v_id: u32) -> Fragment {  // (2) `v_id` holds the index of the vertex WebGPU is processing\\n  var positions = array<vec2<f32>, 6>(\\n    vec2<f32>(-0.5, 0.5), // Top left vertex\\n    vec2<f32>(-0.5, -0.5),// Bottom-left vertex\\n    vec2<f32>(0.5, -0.5), // Bottom-right vertex\\n    vec2<f32>(-0.5, 0.5), // Top left vertex\\n    vec2<f32>(0.5, 0.5),  // Top right vertex\\n    vec2<f32>(0.5, -0.5)  //Bottom right vertex\\n  );\\n  var outFrag:Fragment;\\n  outFrag.pos = vec4f(positions[v_id], 0.0, 1.0);\\n  switch v_id {\\n    case 0, 3: {outFrag.interpolated = vec4f(0.0, 1.0, 1.0, 1.0);}\\n    case 1: {outFrag.interpolated = vec4f(1.0, 0.0, 1.0, 1.0);}\\n    case 4:{outFrag.interpolated = vec4f(1.0, 1.0, 0.0, 1.0);}\\n    case default:{outFrag.interpolated = vec4f(0.0, 0.36, 1.0, 1.0);}\\n  }\\n  return outFrag;\\n}\\n\\n@fragment\\nfn fs_main(outFrag:Fragment) -> @location(0) vec4<f32> {\\n  let black = vec4<f32>(0.0, 0.0, 0.0, 1.0);\\n  let reduced = outFrag.pos.xy / 7.5;\\n  let check2 = sin(reduced.y + reduced.x) < 0.5;\\n  let grid = vec2u(outFrag.pos.xy)/8;\\n  let check = (grid.x + grid.y) % 2 == 1;\\n  return select(black, outFrag.interpolated, check && check2);\\n}\\n\");\n\n//# sourceURL=webpack://04/./srcs/square.wgsl?");

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