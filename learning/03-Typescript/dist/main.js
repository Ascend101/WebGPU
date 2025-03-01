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

/***/ "./src/hexconv/lib/const/lookups.ts":
/*!******************************************!*\
  !*** ./src/hexconv/lib/const/lookups.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hex_lookup: () => (/* binding */ hex_lookup)\n/* harmony export */ });\nconst hex_lookup = [\n    \"0\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"a\", \"b\", \"c\", \"d\", \"e\", \"f\"\n];\n\n\n//# sourceURL=webpack://02/./src/hexconv/lib/const/lookups.ts?");

/***/ }),

/***/ "./src/hexconv/lib/conv.ts":
/*!*********************************!*\
  !*** ./src/hexconv/lib/conv.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   binary_to_hex: () => (/* binding */ binary_to_hex),\n/* harmony export */   dec_to_binary: () => (/* binding */ dec_to_binary)\n/* harmony export */ });\nfunction dec_to_binary(number) {\n    var digits = [];\n    while (number > 0) {\n        var digit = String(number % 2);\n        number = (number - (number % 2)) / 2;\n        digits.push(digit);\n    }\n    return digits.reverse().join(\"\");\n}\nfunction binary_to_hex(number) {\n    let result = 0;\n    for (let i = 0; i < 4; i++) {\n        result += Number(number[i]) * 2 ** (3 - i);\n    }\n    return result;\n}\n\n\n//# sourceURL=webpack://02/./src/hexconv/lib/conv.ts?");

/***/ }),

/***/ "./src/hexconv/lib/format.ts":
/*!***********************************!*\
  !*** ./src/hexconv/lib/format.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   group_binary: () => (/* binding */ group_binary)\n/* harmony export */ });\nfunction group_binary(number) {\n    var digits = [];\n    const number_split = number.split(\"\").reverse();\n    var group_count = (number_split.length - (number_split.length % 4)) / 4 + 1;\n    if (number_split.length % 4 == 0) {\n        group_count -= 1;\n    }\n    var group = [];\n    for (let i = 0; i < number_split.length; i++) {\n        group.push(number_split[i]);\n        if (group.length == 4) {\n            digits.push(group.reverse().join(\"\"));\n            group = [];\n        }\n    }\n    for (let i = number_split.length; i < 4 * group_count; i++) {\n        group.push(\"0\");\n        if (group.length == 4) {\n            digits.push(group.reverse().join(\"\"));\n            group = [];\n        }\n    }\n    return digits.reverse();\n}\n\n\n//# sourceURL=webpack://02/./src/hexconv/lib/format.ts?");

/***/ }),

/***/ "./src/hexconv/main.ts":
/*!*****************************!*\
  !*** ./src/hexconv/main.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_const_lookups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/const/lookups */ \"./src/hexconv/lib/const/lookups.ts\");\n/* harmony import */ var _lib_conv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/conv */ \"./src/hexconv/lib/conv.ts\");\n/* harmony import */ var _lib_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/format */ \"./src/hexconv/lib/format.ts\");\n\n\n\nconst decimal_input = document.getElementById(\"decimalInput\");\nconst conversion_button = document.getElementById(\"convert-button\");\nconst binary_step = document.getElementById(\"binary-raw\");\nconst grouped_binary_step = document.getElementById(\"binary-grouped\");\nconst grouped_hex_step = document.getElementById(\"hexadecimal-grouped\");\nconst hex_output = document.getElementById(\"hexadecimal\");\nconst click = () => {\n    let binary = (0,_lib_conv__WEBPACK_IMPORTED_MODULE_1__.dec_to_binary)(Number(decimal_input.value));\n    binary_step.innerText = \"binary: \" + binary;\n    let tempStr = \"grouped: \";\n    const grouped_binary = (0,_lib_format__WEBPACK_IMPORTED_MODULE_2__.group_binary)(binary);\n    for (let i = 0; i < grouped_binary.length; i++) {\n        tempStr += grouped_binary[i] + \" \";\n    }\n    grouped_binary_step.innerText = tempStr;\n    tempStr = \"hex (grouped): \";\n    for (let i = 0; i < grouped_binary.length; i++) {\n        tempStr += String((0,_lib_conv__WEBPACK_IMPORTED_MODULE_1__.binary_to_hex)(grouped_binary[i])) + \" \";\n    }\n    grouped_hex_step.innerText = tempStr;\n    tempStr = \"final: 0x\";\n    for (let i = 0; i < grouped_binary.length; i++) {\n        tempStr += String(_lib_const_lookups__WEBPACK_IMPORTED_MODULE_0__.hex_lookup[(0,_lib_conv__WEBPACK_IMPORTED_MODULE_1__.binary_to_hex)(grouped_binary[i])]);\n    }\n    hex_output.innerText = tempStr;\n};\nconversion_button.addEventListener(\"click\", click);\n\n\n//# sourceURL=webpack://02/./src/hexconv/main.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/hexconv/main.ts");
/******/ 	
/******/ })()
;