(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["status-status-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/status/status.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/status/status.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<iframe src=\"http://ec2-34-203-203-43.compute-1.amazonaws.com:3000/\" style=\"width: 100%; height: 100vh;\">\n  <p>Your browser does not support iframes.</p>\n</iframe>");

/***/ }),

/***/ "./src/app/_pages/status/status.component.css":
/*!****************************************************!*\
  !*** ./src/app/_pages/status/status.component.css ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19wYWdlcy9zdGF0dXMvc3RhdHVzLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/_pages/status/status.component.ts":
/*!***************************************************!*\
  !*** ./src/app/_pages/status/status.component.ts ***!
  \***************************************************/
/*! exports provided: StatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusComponent", function() { return StatusComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_shared/services/global.service */ "./src/app/_shared/services/global.service.ts");



let StatusComponent = class StatusComponent {
    constructor(gs) {
        this.gs = gs;
    }
    ngOnInit() {
        if (window.location.protocol === 'https:') {
            this.gs.log(`[IFRAME-PROTOCOL] 'https' Detected, Changing To HTTP Instead.`);
            window.location.protocol = 'http:';
        }
    }
};
StatusComponent.ctorParameters = () => [
    { type: src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__["GlobalService"] }
];
StatusComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-status',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./status.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/status/status.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./status.component.css */ "./src/app/_pages/status/status.component.css")).default]
    })
], StatusComponent);



/***/ }),

/***/ "./src/app/_pages/status/status.module.ts":
/*!************************************************!*\
  !*** ./src/app/_pages/status/status.module.ts ***!
  \************************************************/
/*! exports provided: StatusModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusModule", function() { return StatusModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _status_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./status.component */ "./src/app/_pages/status/status.component.ts");





const routes = [
    {
        path: '',
        component: _status_component__WEBPACK_IMPORTED_MODULE_4__["StatusComponent"]
    }
];
let StatusModule = class StatusModule {
};
StatusModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_status_component__WEBPACK_IMPORTED_MODULE_4__["StatusComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
        ]
    })
], StatusModule);



/***/ })

}]);
//# sourceMappingURL=status-status-module-es2015.js.map