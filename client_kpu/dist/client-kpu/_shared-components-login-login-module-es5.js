function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["_shared-components-login-login-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/login/login.component.html":
  /*!*****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/login/login.component.html ***!
    \*****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcApp_sharedComponentsLoginLoginComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"center-screen\" [ngStyle]=\"{\r\n  'background-image': 'url(' + bgLoginImg + ')'\r\n}\" *ngIf=\"!this.as.currentUserValue\" style=\"transform: rotateY(180deg);\">\r\n  <div class=\"container py-3\" style=\"transform: rotateY(180deg);\">\r\n    <div class=\"row justify-content-center no-gutters\">\r\n      <div class=\"col-lg-5 col-md-3\" [ngStyle]=\"{\r\n        'background-position': 'center',\r\n        'background-size': 'cover',\r\n        'background-image': 'url(' + loginImg + ')'\r\n      }\"></div>\r\n      <div class=\"col-lg-7 col-md-9\">\r\n        <div class=\"card\">\r\n          <div class=\"card-body\">\r\n            <form [formGroup]=\"fg\" class=\"m-2\" (ngSubmit)=\"onClickedSubmit()\">\r\n              <div class=\"text-center mb-4\">\r\n                <img class=\"mb-4\" src=\"/favicon.ico\" alt=\"\" />\r\n                <h1 class=\"h3 mb-3 font-weight-normal\">Hai, Selamat Datang! >_<\"</h1>\r\n                <p class=\"text-danger\">{{ loginInfo }}</p>\r\n              </div>\r\n              <div class=\"form-group row\">\r\n                <label for=\"username\" class=\"col-md-4 col-form-label text-md-right\">Nama Pengguna</label>\r\n                <div class=\"col-md-8\">\r\n                  <input type=\"text\" id=\"username\" class=\"form-control {{\r\n                      !fg.get('username').valid && fg.get('username').touched ? 'is-invalid' : ''\r\n                    }}\" placeholder=\"NIK / E-Mail / No. HP\" required autofocus formControlName=\"username\" autocomplete=\"username\" />\r\n                  <span class=\"invalid-feedback\" role=\"alert\">\r\n                    <strong>NIK Tidak Boleh Kosong!</strong>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group row\">\r\n                <label for=\"password\" class=\"col-md-4 col-form-label text-md-right\">Kata Sandi</label>\r\n                <div class=\"col-md-8\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col pr-0\">\r\n                      <input type=\"{{ showPassword ? 'text' : 'password' }}\" id=\"password\" class=\"col form-control {{\r\n                          !fg.get('password').valid && fg.get('password').touched ? 'is-invalid' : ''\r\n                        }}\" placeholder=\"Password\" required formControlName=\"password\" autocomplete=\"current-password\" />\r\n                    </div>\r\n                    <a class=\"btn btn-link text-secondary px-2 mr-3\" (click)=\"showHidePassword()\">\r\n                      <i class=\"fa fa-fw fa-eye\" *ngIf=\"showPassword\"></i>\r\n                      <i class=\"fa fa-fw fa-eye-slash\" *ngIf=\"!showPassword\"></i>\r\n                    </a>\r\n                  </div>\r\n                  <span role=\"alert\" *ngIf=\"!fg.get('password').valid && fg.get('password').touched\" style=\"font-size: 80%; color: #dc3545;\">\r\n                    <strong>Password Tidak Boleh Kosong!</strong>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group row\">\r\n                <div class=\"col offset-md-4\">\r\n                  <div class=\"form-check\">\r\n                    <input id=\"rememberMe\" class=\"form-check-input\" type=\"checkbox\" formControlName=\"rememberMe\" />\r\n                    <label class=\"form-check-label\" for=\"rememberMe\">Biarkan Saya Tetap Login</label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group row mb-0\">\r\n                <div class=\"col-md-8 offset-md-4\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-5 pr-0\">\r\n                      <button class=\"btn btn-success btn-block text-white\" type=\"submit\" [disabled]=\"submitted\">\r\n                        Masuk <i class=\"fa fa-fw fa-key ml-2\"></i>\r\n                      </button>\r\n                    </div>\r\n                    <div class=\"col-7 pl-0\">\r\n                      <button class=\"btn btn-link btn-block text-decoration-none\" type=\"button\" routerLink=\"/register\" [disabled]=\"submitted\">Daftar & Gabung!</button>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n";
    /***/
  },

  /***/
  "./src/app/_shared/components/login/login.component.scss":
  /*!***************************************************************!*\
    !*** ./src/app/_shared/components/login/login.component.scss ***!
    \***************************************************************/

  /*! exports provided: default */

  /***/
  function srcApp_sharedComponentsLoginLoginComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19zaGFyZWQvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/_shared/components/login/login.component.ts":
  /*!*************************************************************!*\
    !*** ./src/app/_shared/components/login/login.component.ts ***!
    \*************************************************************/

  /*! exports provided: LoginComponent */

  /***/
  function srcApp_sharedComponentsLoginLoginComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
      return LoginComponent;
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


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../services/global.service */
    "./src/app/_shared/services/global.service.ts");
    /* harmony import */


    var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../services/auth.service */
    "./src/app/_shared/services/auth.service.ts");
    /* harmony import */


    var crypto_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! crypto-js */
    "./node_modules/crypto-js/index.js");
    /* harmony import */


    var crypto_js__WEBPACK_IMPORTED_MODULE_6___default =
    /*#__PURE__*/
    __webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_6__);
    /* harmony import */


    var src_environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! src/environments/environment */
    "./src/environments/environment.ts");

    var LoginComponent =
    /*#__PURE__*/
    function () {
      function LoginComponent(fb, gs, route, router, as) {
        _classCallCheck(this, LoginComponent);

        this.fb = fb;
        this.gs = gs;
        this.route = route;
        this.router = router;
        this.as = as;
        this.submitted = false;
        this.showPassword = false;
        this.returnUrl = '/';
        this.loginImg = null;
        this.bgLoginImg = '/assets/img/bg-login.svg';
        this.loginInfo = 'Silahkan login terlebih dahulu~';

        if (this.as.currentUserValue) {
          this.router.navigate(['/home']);
        }

        this.loginImg = 'https://via.placeholder.com/462x440/' + this.gs.randomColor;
      }

      _createClass(LoginComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
          this.fg = this.fb.group({
            username: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            password: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            rememberMe: [false, []]
          });
        }
      }, {
        key: "showHidePassword",
        value: function showHidePassword() {
          this.showPassword = !this.showPassword;
        }
      }, {
        key: "onClickedSubmit",
        value: function onClickedSubmit() {
          var _this = this;

          this.submitted = true;
          this.loginInfo = 'Harap Menunggu ...';

          if (this.fg.invalid) {
            this.loginInfo = 'Periksa Dan Isi Kembali Data Anda!';
            this.submitted = false;
            return;
          }

          this.gs.log('[COMPONENT_LOGIN]', this.fg.value);

          if (this.fg.valid) {
            this.submitted = true;
            this.as.login({
              username: this.fg.value.username,
              password: crypto_js__WEBPACK_IMPORTED_MODULE_6__["SHA512"](this.fg.value.password).toString(),
              rememberMe: this.fg.value.rememberMe
            }).subscribe(function (res) {
              localStorage.setItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].tokenName, res.result.token);

              _this.as.verify(localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].tokenName)).subscribe(function (success) {
                return _this.router.navigate([_this.returnUrl]);
              }, function (error) {
                return _this.as.logout();
              });
            }, function (err) {
              _this.loginInfo = err.error.result.message || err.error.info;
              _this.submitted = false;
            });
          }
        }
      }, {
        key: "loginFormVal",
        get: function get() {
          return this.fg.controls;
        }
      }]);

      return LoginComponent;
    }();

    LoginComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: _services_global_service__WEBPACK_IMPORTED_MODULE_4__["GlobalService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]
      }];
    };

    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./login.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/login/login.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./login.component.scss */
      "./src/app/_shared/components/login/login.component.scss")).default]
    })], LoginComponent);
    /***/
  },

  /***/
  "./src/app/_shared/components/login/login.module.ts":
  /*!**********************************************************!*\
    !*** ./src/app/_shared/components/login/login.module.ts ***!
    \**********************************************************/

  /*! exports provided: LoginModule */

  /***/
  function srcApp_sharedComponentsLoginLoginModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginModule", function () {
      return LoginModule;
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


    var _login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./login.component */
    "./src/app/_shared/components/login/login.component.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");

    var routes = [{
      path: '',
      component: _login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]
    }];

    var LoginModule = function LoginModule() {
      _classCallCheck(this, LoginModule);
    };

    LoginModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes), _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"]]
    })], LoginModule);
    /***/
  }
}]);
//# sourceMappingURL=_shared-components-login-login-module-es5.js.map