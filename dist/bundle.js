/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* all exports used */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ function(module, exports) {

eval("module.exports = React;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCI/OWRlOSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 1 */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/components/ChartContainer.tsx ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("\"use strict\";\r\nvar __extends = (this && this.__extends) || function (d, b) {\r\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\r\n    function __() { this.constructor = d; }\r\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n};\r\nvar React = __webpack_require__(/*! react */ 0);\r\nvar ChartContainer = (function (_super) {\r\n    __extends(ChartContainer, _super);\r\n    function ChartContainer() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    ChartContainer.prototype.render = function () {\r\n        return React.createElement(\"h1\", null,\r\n            \"Hello from me to \",\r\n            this.props.compiler,\r\n            \" and \",\r\n            this.props.framework,\r\n            \"!\");\r\n    };\r\n    return ChartContainer;\r\n}(React.Component));\r\nexports.ChartContainer = ChartContainer;\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9DaGFydENvbnRhaW5lci50c3g/NTQ1NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcnRDb250YWluZXJQcm9wcyB7IGNvbXBpbGVyOiBzdHJpbmc7IGZyYW1ld29yazogc3RyaW5nOyB9XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhcnRDb250YWluZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Q2hhcnRDb250YWluZXJQcm9wcywgdW5kZWZpbmVkPiB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxoMT5IZWxsbyBmcm9tIG1lIHRvIHt0aGlzLnByb3BzLmNvbXBpbGVyfSBhbmQge3RoaXMucHJvcHMuZnJhbWV3b3JrfSE8L2gxPjtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9DaGFydENvbnRhaW5lci50c3giXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBSUE7QUFBQTtBQUFBOztBQUlBO0FBSEE7QUFDQTs7QUFBQTs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBSkE7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/* all exports used */
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ function(module, exports) {

eval("module.exports = ReactDOM;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0RE9NXCI/NGFiNCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiUmVhY3RET01cIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/* all exports used */
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("\"use strict\";\r\nvar React = __webpack_require__(/*! react */ 0);\r\nvar ReactDOM = __webpack_require__(/*! react-dom */ 2);\r\nvar ChartContainer_1 = __webpack_require__(/*! ./components/ChartContainer */ 1);\r\nReactDOM.render(React.createElement(ChartContainer_1.ChartContainer, { compiler: \"TypeScript\", framework: \"React\" }), document.getElementById(\"example\"));\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvaW5kZXgudHN4PzM4NjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuXHJcbmltcG9ydCB7IENoYXJ0Q29udGFpbmVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9DaGFydENvbnRhaW5lclwiO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPENoYXJ0Q29udGFpbmVyIGNvbXBpbGVyPVwiVHlwZVNjcmlwdFwiIGZyYW1ld29yaz1cIlJlYWN0XCIgLz4sXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4YW1wbGVcIilcclxuKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2luZGV4LnRzeCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFFQTtBQUVBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);