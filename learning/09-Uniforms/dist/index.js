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
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ \"./srcs/renderer.ts\");\n/// <reference types=\"@webgpu/types\" />\n//Pas oublier cette ligne pour les types/fonctions webgpu\n\nlet canvas = document.getElementById(\"screen\");\nlet renderer = new _renderer__WEBPACK_IMPORTED_MODULE_0__.Renderer(canvas, performance.now());\nawait renderer.Initialize();\nlet observer = new ResizeObserver(() => {\n    renderer.Resize();\n});\nobserver.observe(canvas);\nfunction renderLoop() {\n    renderer.Draw(performance.now());\n    requestAnimationFrame(renderLoop);\n}\nrequestAnimationFrame(renderLoop);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://04/./srcs/index.ts?");

/***/ }),

/***/ "./srcs/mesh.ts":
/*!**********************!*\
  !*** ./srcs/mesh.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SuperMesh: () => (/* binding */ SuperMesh)\n/* harmony export */ });\nclass SuperMesh {\n    constructor(device) {\n        const vertices = new Float32Array([\n            -0.5, 0.5, 0.0, 1.0, 1.0, //tl\n            -0.5, -0.5, 1.0, 0.0, 1.0, //bl\n            0.5, 0.5, 1.0, 1.0, 0.0, //tr\n            0.5, -0.5, 0.0, 0.36, 1.0 //br\n        ]);\n        this.buffer = device.createBuffer({\n            size: vertices.byteLength,\n            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,\n            mappedAtCreation: true\n        });\n        new Float32Array(this.buffer.getMappedRange()).set(vertices); //rien compris\n        this.buffer.unmap();\n        this.bufferLayout = {\n            arrayStride: 20,\n            attributes: [\n                {\n                    shaderLocation: 0,\n                    format: \"float32x2\",\n                    offset: 0\n                },\n                {\n                    shaderLocation: 1,\n                    format: \"float32x3\",\n                    offset: 8 //2 float = 8bytes \n                }\n            ]\n        };\n    }\n}\n\n\n//# sourceURL=webpack://04/./srcs/mesh.ts?");

/***/ }),

/***/ "./srcs/renderer.ts":
/*!**************************!*\
  !*** ./srcs/renderer.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Renderer: () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _square_wgsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./square.wgsl */ \"./srcs/square.wgsl\");\n/* harmony import */ var _mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mesh */ \"./srcs/mesh.ts\");\n\n\nclass Renderer {\n    constructor(canvas, ct) {\n        this.canvas = canvas;\n        this.width = canvas.clientWidth; //1\n        this.height = canvas.clientHeight; //2\n        this.aspect = this.width / this.height;\n        this.ctx = this.canvas.getContext(\"webgpu\");\n        this.format = \"bgra8unorm\";\n        this.lt = ct;\n    }\n    async Initialize() {\n        const gpuAdapt = await navigator.gpu?.requestAdapter();\n        this.device = await gpuAdapt?.requestDevice();\n        this.canvas.width = Math.max(1, Math.min(this.width, this.device.limits.maxTextureDimension2D)); //3\n        this.canvas.height = Math.max(1, Math.min(this.height, this.device.limits.maxTextureDimension2D)); //4\n        //On fait ça parce que la résolution du canva reste inchangée après resize dans le css\n        //Normalement on utilise un resize observer mais là l'image est statique ça n'est pas nécessaire\n        this.ctx.configure({ device: this.device, format: this.format, alphaMode: \"premultiplied\" });\n        //VBO\n        this.vboCarre = new _mesh__WEBPACK_IMPORTED_MODULE_1__.SuperMesh(this.device);\n        this.pipeline = this.device.createRenderPipeline({\n            layout: \"auto\",\n            vertex: {\n                module: this.device.createShaderModule({\n                    code: _square_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n                }),\n                entryPoint: \"vs_main\",\n                buffers: [this.vboCarre.bufferLayout]\n            },\n            fragment: {\n                module: this.device.createShaderModule({\n                    code: _square_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n                }),\n                entryPoint: \"fs_main\",\n                targets: [{ format: this.format }]\n            },\n            primitive: { topology: \"triangle-strip\" }\n        });\n        //UNIFORM ALLOCATION MEMOIRE\n        this.uniformBuffer = this.device.createBuffer({\n            size: 16,\n            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,\n        });\n        this.uniformValues = new ArrayBuffer(16);\n        this.uniformViews = {\n            tps: new Float32Array(this.uniformValues, 0, 1),\n            scale: new Float32Array(this.uniformValues, 8, 2)\n        };\n        // AFFECTATION A UN GROUPE DE LIEN POUR LE SHADER\n        this.bindGroup = this.device.createBindGroup({\n            layout: this.pipeline.getBindGroupLayout(0),\n            entries: [\n                { binding: 0, resource: { buffer: this.uniformBuffer } },\n            ],\n        });\n    }\n    Resize() {\n        this.width = this.canvas.clientWidth; //1\n        this.height = this.canvas.clientHeight; //2\n        this.aspect = this.width / this.height;\n        this.ctx.configure({ device: this.device, format: this.format, alphaMode: \"premultiplied\" });\n    }\n    Draw(tps) {\n        this.dt = (tps - this.lt) * 0.01;\n        this.lt = tps;\n        //ON AJOUTE L'ECRITURE DU BUFFER A LA QUEUE\n        this.uniformViews.tps.set([this.lt * 0.001]);\n        this.uniformViews.scale.set([0.5 / this.aspect, 0.5]);\n        this.device.queue.writeBuffer(this.uniformBuffer, 0, this.uniformValues);\n        const textureView = this.ctx.getCurrentTexture().createView();\n        const commandEncoder = this.device.createCommandEncoder();\n        this.renderPass = commandEncoder.beginRenderPass({\n            colorAttachments: [{\n                    view: textureView,\n                    clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },\n                    loadOp: \"clear\",\n                    storeOp: \"store\"\n                }]\n        });\n        this.renderPass.setPipeline(this.pipeline);\n        this.renderPass.setVertexBuffer(0, this.vboCarre.buffer);\n        this.renderPass.setBindGroup(0, this.bindGroup);\n        this.renderPass.draw(4, 1, 0, 0);\n        this.renderPass.end();\n        this.device.queue.submit([commandEncoder.finish()]);\n    }\n}\n\n\n//# sourceURL=webpack://04/./srcs/renderer.ts?");

/***/ }),

/***/ "./srcs/square.wgsl":
/*!**************************!*\
  !*** ./srcs/square.wgsl ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"struct Fragment{\\n  @builtin(position) pos:vec4f,\\n  @location(0) interpolated:vec4f,\\n}\\n\\nstruct Decouverte{\\n  tps:f32,\\n  scale:vec2f\\n}\\n\\n@group(0)@binding(0) var <uniform> decouverte:Decouverte;\\n\\n@vertex\\nfn vs_main(@location(0) vx_pos : vec2<f32>, @location(1) vx_col: vec3<f32>) -> Fragment {  // (2) `v_id` holds the index of the vertex WebGPU is processing\\n  var outFrag:Fragment;\\n  outFrag.pos = vec4f(vx_pos.x * decouverte.scale.x + cos(decouverte.tps*3)*0.1, vx_pos.y * decouverte.scale.y + sin(decouverte.tps*3)*0.1, 0.0, 1.0);\\n  outFrag.interpolated = vec4f(vx_col*sin(decouverte.tps), 1.0);\\n  return outFrag;\\n}\\n\\n@fragment\\nfn fs_main(outFrag:Fragment) -> @location(0) vec4<f32> {\\n  return outFrag.interpolated;\\n}\\n\");\n\n//# sourceURL=webpack://04/./srcs/square.wgsl?");

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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