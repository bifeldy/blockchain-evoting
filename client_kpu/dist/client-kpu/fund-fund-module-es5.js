function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["fund-fund-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/fund/fund.component.html":
  /*!***************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/fund/fund.component.html ***!
    \***************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcApp_pagesFundFundComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"container py-3 bg-default\" *ngIf=\"currentUser\">\n  <div class=\"row\">\n    <div class=\"col-md-12 bg-default\">\n      <div class=\"row mt-3 mb-3\">\n        <div class=\"col-12 pb-3 sticky-top bg-default\">\n          <h3 class=\"pt-3 pb-2 border-bottom-dotted\">\n            <a href=\"{{ urlExport }}\" class=\"btn btn-outline-warning float-right btn-sm mt-1 text-primary\">\n              <i class=\"fas fa-file-download mr-1\"></i>\n              Download\n            </a>\n            <b class=\"text-secondary\">\n              My Information\n            </b>\n          </h3>\n        </div>\n        <div class=\"col-12 bg-default pt-1\">\n          <div class=\"form-group row\">\n            <label for=\"id\" class=\"col-md-4 col-form-label text-md-right\">ID</label>\n            <div class=\"col-md-8\">\n              <input type=\"number\" id=\"id\" class=\"form-control\" required autofocus\n                autocomplete=\"off\" disabled value=\"{{ currentUser.id }}\" />\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"name\" class=\"col-md-4 col-form-label text-md-right\">Account Name</label>\n            <div class=\"col-md-8\">\n              <input type=\"text\" id=\"name\" class=\"form-control\" required autofocus\n                autocomplete=\"off\" disabled value=\"{{ currentUser.name }}\" />\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"nik\" class=\"col-md-4 col-form-label text-md-right\">NIK</label>\n            <div class=\"col-md-8\">\n              <input type=\"number\" id=\"nik\" class=\"form-control\" required autofocus\n                autocomplete=\"off\" disabled value=\"{{ currentUser.nik }}\" />\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"phone\" class=\"col-md-4 col-form-label text-md-right\">Phone Number</label>\n            <div class=\"col-md-8\">\n              <input type=\"number\" id=\"phone\" class=\"form-control\" required autofocus\n                autocomplete=\"off\" disabled value=\"{{ currentUser.phone }}\" />\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"email\" class=\"col-md-4 col-form-label text-md-right\">Email</label>\n            <div class=\"col-md-8\">\n              <input type=\"text\" id=\"email\" class=\"form-control\" required autofocus\n                autocomplete=\"off\" disabled value=\"{{ currentUser.email }}\" />\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"pubKey\" class=\"col-md-4 col-form-label text-md-right\">Publick Key Address</label>\n            <div class=\"col-md-8\">\n              <input type=\"text\" id=\"pubKey\" class=\"form-control\" required autofocus\n                autocomplete=\"off\" disabled value=\"{{ currentUser.pubKey }}\" />\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"ether\" class=\"col-md-4 col-form-label text-md-right\">Coin (Wei)</label>\n            <div class=\"col-md-8\">\n              <input type=\"number\" id=\"ether\" class=\"form-control\" required autofocus\n                autocomplete=\"off\" disabled value=\"{{ myCoinBase.wei }}\" />\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"ether\" class=\"col-md-4 col-form-label text-md-right\">Coin (G-Wei)</label>\n            <div class=\"col-md-8\">\n              <input type=\"number\" id=\"ether\" class=\"form-control\" required autofocus\n                autocomplete=\"off\" disabled value=\"{{ myCoinBase.gwei }}\" />\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"ether\" class=\"col-md-4 col-form-label text-md-right\">Coin (Ether)</label>\n            <div class=\"col-md-8\">\n              <input type=\"number\" id=\"ether\" class=\"form-control\" required autofocus\n                autocomplete=\"off\" disabled value=\"{{ myCoinBase.ether }}\" />\n            </div>\n          </div>\n          <div class=\"form-group row\">\n            <label for=\"ether\" class=\"col-md-4 col-form-label text-md-right\">Coin (Tether)</label>\n            <div class=\"col-md-8\">\n              <input type=\"number\" id=\"ether\" class=\"form-control\" required autofocus\n                autocomplete=\"off\" disabled value=\"{{ myCoinBase.tether }}\" />\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row mt-3 mb-3\" *ngIf=\"currentUser && currentUser.role != 'admin'\">\n        <div class=\"col-12 pb-3 sticky-top bg-default\">\n          <h3 class=\"pt-3 pb-2 border-bottom-dotted\">\n            <button class=\"btn btn-outline-warning float-right btn-sm mt-1 text-primary\" (click)=\"sendRequestCoin()\" [disabled]=\"submitted\">\n              <i class=\"fab fa-ethereum mr-1\"></i>\n              Kirim Permintaan\n            </button>\n            <b class=\"text-secondary\">\n              Request Ether Coin\n            </b>\n          </h3>\n        </div>\n        <div class=\"col-12 bg-default pt-1\">\n          <div class=\"form-group row\">\n            <label for=\"amount\" class=\"col-md-4 col-form-label text-md-right\">Ether Amount</label>\n            <div class=\"col-md-8\">\n              <input class=\"form-control {{ etherValueRequestedError ? 'is-invalid' : '' }}\" type=\"number\" min=\"1\" max=\"25\"\n                id=\"amount\" [(ngModel)]=\"etherValueRequested\" (change)=\"typingEtherValue($event)\" placeholder=\"Jumlah Ether\" />\n              <span class=\"invalid-feedback\" role=\"alert\">\n                <strong>Jumlah Yang Diperbolehkan 1-25</strong>\n              </span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<app-confirm-modal (submitButton)=\"confirmModalCallback($event)\"></app-confirm-modal>";
    /***/
  },

  /***/
  "./src/app/_pages/fund/fund.component.css":
  /*!************************************************!*\
    !*** ./src/app/_pages/fund/fund.component.css ***!
    \************************************************/

  /*! exports provided: default */

  /***/
  function srcApp_pagesFundFundComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19wYWdlcy9mdW5kL2Z1bmQuY29tcG9uZW50LmNzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/_pages/fund/fund.component.ts":
  /*!***********************************************!*\
    !*** ./src/app/_pages/fund/fund.component.ts ***!
    \***********************************************/

  /*! exports provided: FundComponent */

  /***/
  function srcApp_pagesFundFundComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FundComponent", function () {
      return FundComponent;
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


    var src_app_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/_shared/services/auth.service */
    "./src/app/_shared/services/auth.service.ts");
    /* harmony import */


    var src_app_shared_services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/_shared/services/user.service */
    "./src/app/_shared/services/user.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! src/environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! src/app/_shared/services/global.service */
    "./src/app/_shared/services/global.service.ts");
    /* harmony import */


    var src_app_shared_components_confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! src/app/_shared/components/confirm-modal/confirm-modal.component */
    "./src/app/_shared/components/confirm-modal/confirm-modal.component.ts");

    var FundComponent =
    /*#__PURE__*/
    function () {
      function FundComponent(as, us, router, gs) {
        _classCallCheck(this, FundComponent);

        this.as = as;
        this.us = us;
        this.router = router;
        this.gs = gs;
        this.currUser = null;
        this.urlExport = "".concat(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl, "/user/export?jwt=").concat(localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].tokenName));
        this.etherValueRequested = null;
        this.etherValueRequestedError = false;
        this.submitted = false;
      }

      _createClass(FundComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          this.as.currentUser.subscribe(function (user) {
            _this.currUser = user;

            if (!_this.currUser) {
              _this.router.navigateByUrl('/home');
            }
          });
        }
      }, {
        key: "typingEtherValue",
        value: function typingEtherValue($event) {
          if (this.etherValueRequested < 1) {
            this.etherValueRequested = 1;
          } else if (this.etherValueRequested > 25) {
            this.etherValueRequested = 25;
          } else {
            this.etherValueRequested = parseInt(this.etherValueRequested, 10);
          }
        }
      }, {
        key: "sendRequestCoin",
        value: function sendRequestCoin() {
          var _this2 = this;

          this.submitted = true;
          this.etherValueRequestedError = false;

          if (this.etherValueRequested >= 1 && this.etherValueRequested <= 25) {
            this.us.requestCoin({
              amount: this.etherValueRequested
            }).subscribe(function (res) {
              _this2.gs.log('[RequestCoin]', res);

              _this2.submitted = false;
              _this2.etherValueRequested = null;

              _this2.confirmModal.showModal({
                callbackData: 'requestCoinFinished',
                title: "Request Coin",
                body: JSON.stringify(res.result.message),
                submit: 'OK'
              });
            }, function (err) {
              _this2.etherValueRequested = null;
              _this2.submitted = false;

              _this2.confirmModal.showModal({
                callbackData: 'requestCoinFailed',
                title: "Request Coin",
                body: JSON.stringify(err.error.result.message),
                submit: 'OK'
              });
            });
          } else {
            this.submitted = false;
            this.etherValueRequestedError = true;
          }
        }
      }, {
        key: "confirmModalCallback",
        value: function confirmModalCallback(callbackData) {
          if (callbackData === 'requestCoinFinished') {} else if (callbackData === 'requestCoinFailed') {}
        }
      }, {
        key: "currentUser",
        get: function get() {
          return this.currUser;
        }
      }, {
        key: "myCoinBase",
        get: function get() {
          return this.us.myCoinBase;
        }
      }]);

      return FundComponent;
    }();

    FundComponent.ctorParameters = function () {
      return [{
        type: src_app_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]
      }, {
        type: src_app_shared_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__["GlobalService"]
      }];
    };

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(src_app_shared_components_confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_7__["ConfirmModalComponent"], {
      static: true
    })], FundComponent.prototype, "confirmModal", void 0);
    FundComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-fund',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./fund.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/fund/fund.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./fund.component.css */
      "./src/app/_pages/fund/fund.component.css")).default]
    })], FundComponent);
    /***/
  },

  /***/
  "./src/app/_pages/fund/fund.module.ts":
  /*!********************************************!*\
    !*** ./src/app/_pages/fund/fund.module.ts ***!
    \********************************************/

  /*! exports provided: FundModule */

  /***/
  function srcApp_pagesFundFundModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FundModule", function () {
      return FundModule;
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


    var _fund_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./fund.component */
    "./src/app/_pages/fund/fund.component.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var src_app_shared_components_confirm_modal_confirm_modal_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! src/app/_shared/components/confirm-modal/confirm-modal.module */
    "./src/app/_shared/components/confirm-modal/confirm-modal.module.ts");

    var routes = [{
      path: '',
      component: _fund_component__WEBPACK_IMPORTED_MODULE_4__["FundComponent"]
    }];

    var FundModule = function FundModule() {
      _classCallCheck(this, FundModule);
    };

    FundModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_fund_component__WEBPACK_IMPORTED_MODULE_4__["FundComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], src_app_shared_components_confirm_modal_confirm_modal_module__WEBPACK_IMPORTED_MODULE_6__["ConfirmModalModule"]]
    })], FundModule);
    /***/
  }
}]);
//# sourceMappingURL=fund-fund-module-es5.js.map