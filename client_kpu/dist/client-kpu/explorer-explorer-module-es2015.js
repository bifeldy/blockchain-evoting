(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["explorer-explorer-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/explorer/explorer.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/explorer/explorer.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<iframe src=\"http://18.234.240.253:8000/\" style=\"width: 100%; height: 100vh;\">\n  <p>Your browser does not support iframes.</p>\n</iframe>");

/***/ }),

/***/ "./src/app/_pages/explorer/explorer.component.css":
/*!********************************************************!*\
  !*** ./src/app/_pages/explorer/explorer.component.css ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19wYWdlcy9leHBsb3Jlci9leHBsb3Jlci5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/_pages/explorer/explorer.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/_pages/explorer/explorer.component.ts ***!
  \*******************************************************/
/*! exports provided: ExplorerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExplorerComponent", function() { return ExplorerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ExplorerComponent = class ExplorerComponent {
    constructor() { }
    ngOnInit() {
    }
};
ExplorerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-explorer',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./explorer.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/explorer/explorer.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./explorer.component.css */ "./src/app/_pages/explorer/explorer.component.css")).default]
    })
], ExplorerComponent);



/***/ }),

/***/ "./src/app/_pages/explorer/explorer.module.ts":
/*!****************************************************!*\
  !*** ./src/app/_pages/explorer/explorer.module.ts ***!
  \****************************************************/
/*! exports provided: ExplorerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExplorerModule", function() { return ExplorerModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _explorer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./explorer.component */ "./src/app/_pages/explorer/explorer.component.ts");





const routes = [
    {
        path: '',
        component: _explorer_component__WEBPACK_IMPORTED_MODULE_4__["ExplorerComponent"]
    }
];
let ExplorerModule = class ExplorerModule {
};
ExplorerModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_explorer_component__WEBPACK_IMPORTED_MODULE_4__["ExplorerComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
        ]
    })
], ExplorerModule);



/***/ })

}]);
//# sourceMappingURL=explorer-explorer-module-es2015.js.map