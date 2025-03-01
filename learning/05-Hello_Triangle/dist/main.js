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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shader_wgsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shader.wgsl */ \"./src/shader.wgsl\");\n/// <reference types=\"@webgpu/types\" />\n\nconst Initialize = async () => {\n    //J'essaie dans mes mots d'expliciter les commandes, tout n'est pas parfaitement correct mais ça me permet de développer un modèle de compréhension basique et d'avancer\n    const canvas = document.getElementById(\"gfx-main\"); //On récupère le canvas sur lequel on va dessiner\n    const adapter = await navigator.gpu?.requestAdapter(); //On vérifie que l'interface GPU nous fournit un adaptateur\n    const device = await adapter?.requestDevice(); //On récupère la référence matérielle du GPU\n    const context = canvas.getContext(\"webgpu\"); //On définie le contexte dans lequel le canvas sera utilisé\n    const format = \"bgra8unorm\"; //Format de couleur des textures\n    context.configure({\n        device: device,\n        format: format,\n        alphaMode: \"premultiplied\"\n    }); //Configuration du contexte\n    const pipeline = device.createRenderPipeline({\n        layout: \"auto\", //Arrangement automatique de la pipeline\n        vertex: {\n            module: device.createShaderModule({\n                code: _shader_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n            }),\n            entryPoint: \"vs_main\" //fonction d'entrée dans le vertex shader\n        },\n        fragment: {\n            module: device.createShaderModule({\n                code: _shader_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n            }),\n            entryPoint: \"fs_main\", //fonction d'entrée dans le fragment shader\n            targets: [{\n                    format: format //format couleur fs\n                }]\n        },\n        primitive: {\n            topology: \"triangle-list\" //Manière selon laquelle seront rasterizés les sommets ?\n        }\n    });\n    const textureView = context.getCurrentTexture().createView(); //Prends la texture actuelle pour l'éditer\n    //Crée un commandEncoder, qui correspond à une sorte de todolist pour la CG, avec WebGPU on envoie les commandes en batch (lots)\n    const commandEncoder = device.createCommandEncoder();\n    //Définition de la passe de rendu qu'on va envoyer à travers commandEncoder\n    const renderpass = commandEncoder.beginRenderPass({\n        colorAttachments: [{\n                view: textureView,\n                clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },\n                loadOp: \"clear\",\n                storeOp: \"store\"\n            }]\n    });\n    renderpass.setPipeline(pipeline); //on définie la pipeline préalablement faite sur cette passe de rendu\n    renderpass.draw(3, 1, 0, 0); //(nb_vertex, nb_instance=1, offset_vertex=0, first_instance=0)\n    renderpass.end(); //Fermeture de la passe de rendu\n    const finishedCommandEncoder = commandEncoder.finish(); //Fin du commandEncoder\n    device.queue.submit([finishedCommandEncoder]); //Envoi à la liste des instructions qui doivent être traitées par le GPU\n};\nInitialize();\n\n\n//# sourceURL=webpack://04/./src/main.ts?");

/***/ }),

/***/ "./src/shader.wgsl":
/*!*************************!*\
  !*** ./src/shader.wgsl ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"//Définition de la structure fragment qui va être feed au fragment shader\\nstruct Fragment{\\n  @builtin(position) Position : vec4<f32>,\\n  @location(0) Color : vec4<f32>\\n};\\n\\n@vertex//Dit au GPU que c'est une fonction à utiliser pendant la phase de vertex\\nfn vs_main(@builtin(vertex_index) v_id:u32)-> Fragment{\\n  var positions = array<vec2<f32>, 3>(\\n    vec2<f32>(0.0, 0.5),\\n    vec2<f32>(-0.5, -0.5),\\n    vec2<f32>(0.5, -0.5)\\n  );\\n\\n  //gestion des couleurs faites par le shader de vertex pour ce cas spécifique\\n  var colors = array<vec3<f32>, 3>(\\n    vec3<f32>(.9, 0.1, 0.0),\\n    vec3<f32>(0.0, 0.1, 0.9),\\n    vec3<f32>(1., 0., 1.)\\n  );\\n\\n  //création d'un fragment et assignation d'une couleur dans fragment\\n  var output: Fragment;\\n  output.Position = vec4<f32>(positions[v_id], 0.0, 0.6);\\n  output.Color = vec4<f32>(colors[v_id], 1.0);\\n\\n  return output;\\n}\\n\\n@fragment\\nfn fs_main(fsInput:Fragment)->  @location(0) vec4<f32>{\\n  return fsInput.Color;\\n}\");\n\n//# sourceURL=webpack://04/./src/shader.wgsl?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;