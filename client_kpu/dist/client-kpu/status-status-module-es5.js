function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["status-status-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/status/status.component.html":
  /*!*******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/status/status.component.html ***!
    \*******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcApp_pagesStatusStatusComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<iframe src=\"http://ec2-34-203-203-43.compute-1.amazonaws.com:3000/\" style=\"width: 100%; height: 100vh;\">\n  <p>Your browser does not support iframes.</p>\n</iframe>";
    /***/
  },

  /***/
  "./src/app/_pages/status/status.component.css":
  /*!****************************************************!*\
    !*** ./src/app/_pages/status/status.component.css ***!
    \****************************************************/

  /*! exports provided: default */

  /***/
  function srcApp_pagesStatusStatusComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19wYWdlcy9zdGF0dXMvc3RhdHVzLmNvbXBvbmVudC5jc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/_pages/status/status.component.ts":
  /*!***************************************************!*\
    !*** ./src/app/_pages/status/status.component.ts ***!
    \***************************************************/

  /*! exports provided: StatusComponent */

  /***/
  function srcApp_pagesStatusStatusComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StatusComponent", function () {
      return StatusComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/_shared/services/global.service */
    "./src/app/_shared/services/global.service.ts");

    var StatusComponent =
    /*#__PURE__*/
    function () {
      function StatusComponent(gs) {
        _classCallCheck(this, StatusComponent);

        this.gs = gs;
      }

      _createClass(StatusComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var currentUrl = window.location.href;

          if (currentUrl.startsWith('https')) {
            this.gs.log("[IFRAME-STATUS] 'https' Detected, Reload And Using HTTP Instead.");
            window.location.href = 'http' + currentUrl.slice(5, currentUrl.length);
            window.location.reload();
          }
        }
      }]);

      return StatusComponent;
    }();

    StatusComponent.ctorParameters = function () {
      return [{
        type: src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__["GlobalService"]
      }];
    };

    StatusComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-status',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./status.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/status/status.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./status.component.css */
      "./src/app/_pages/status/status.component.css")).default]
    })], StatusComponent);
    /***/
  },

  /***/
  "./src/app/_pages/status/status.module.ts":
  /*!************************************************!*\
    !*** ./src/app/_pages/status/status.module.ts ***!
    \************************************************/

  /*! exports provided: StatusModule */

  /***/
  function srcApp_pagesStatusStatusModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StatusModule", function () {
      return StatusModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _status_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./status.component */
    "./src/app/_pages/status/status.component.ts");

    var routes = [{
      path: '',
      component: _status_component__WEBPACK_IMPORTED_MODULE_4__["StatusComponent"]
    }];

    var StatusModule = function StatusModule() {
      _classCallCheck(this, StatusModule);
    };

    StatusModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_status_component__WEBPACK_IMPORTED_MODULE_4__["StatusComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)]
    })], StatusModule);
    /***/
  }
}]);
//# sourceMappingURL=status-status-module-es5.js.map