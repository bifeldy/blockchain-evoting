(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["_shared-components-register-register-module"],{

/***/ "./node_modules/ng-recaptcha/fesm2015/ng-recaptcha.js":
/*!************************************************************!*\
  !*** ./node_modules/ng-recaptcha/fesm2015/ng-recaptcha.js ***!
  \************************************************************/
/*! exports provided: RECAPTCHA_BASE_URL, RECAPTCHA_LANGUAGE, RECAPTCHA_NONCE, RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service, RecaptchaComponent, RecaptchaFormsModule, RecaptchaLoaderService, RecaptchaModule, RecaptchaV3Module, RecaptchaValueAccessorDirective, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECAPTCHA_BASE_URL", function() { return RECAPTCHA_BASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECAPTCHA_LANGUAGE", function() { return RECAPTCHA_LANGUAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECAPTCHA_NONCE", function() { return RECAPTCHA_NONCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECAPTCHA_SETTINGS", function() { return RECAPTCHA_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECAPTCHA_V3_SITE_KEY", function() { return RECAPTCHA_V3_SITE_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReCaptchaV3Service", function() { return ReCaptchaV3Service; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaComponent", function() { return RecaptchaComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaFormsModule", function() { return RecaptchaFormsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaLoaderService", function() { return RecaptchaLoaderService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaModule", function() { return RecaptchaModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaV3Module", function() { return RecaptchaV3Module; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecaptchaValueAccessorDirective", function() { return RecaptchaValueAccessorDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return RecaptchaCommonModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");






const RECAPTCHA_LANGUAGE = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('recaptcha-language');
const RECAPTCHA_BASE_URL = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('recaptcha-base-url');
const RECAPTCHA_NONCE = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('recaptcha-nonce-tag');
function loadScript(renderMode, onLoaded, urlParams, url, nonce) {
    window.ng2recaptchaloaded = () => {
        onLoaded(grecaptcha);
    };
    const script = document.createElement('script');
    script.innerHTML = '';
    const baseUrl = url || 'https://www.google.com/recaptcha/api.js';
    script.src = `${baseUrl}?render=${renderMode}&onload=ng2recaptchaloaded${urlParams}`;
    if (nonce) {
        // tslint:disable-next-line:no-any Remove "any" cast once we upgrade Angular to 7 and TypeScript along with it
        script.nonce = nonce;
    }
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}
let RecaptchaLoaderService = RecaptchaLoaderService_1 = class RecaptchaLoaderService {
    constructor(
    // tslint:disable-next-line:no-any
    platformId, language, baseUrl, nonce) {
        this.platformId = platformId;
        this.language = language;
        this.baseUrl = baseUrl;
        this.nonce = nonce;
        this.init();
        this.ready = Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId) ? RecaptchaLoaderService_1.ready.asObservable() : Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])();
    }
    /** @internal */
    init() {
        if (RecaptchaLoaderService_1.ready) {
            return;
        }
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            const subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
            RecaptchaLoaderService_1.ready = subject;
            const langParam = this.language ? '&hl=' + this.language : '';
            loadScript('explicit', (grecaptcha) => subject.next(grecaptcha), langParam, this.baseUrl, this.nonce);
        }
    }
};
/**
 * @internal
 * @nocollapse
 */
RecaptchaLoaderService.ready = null;
RecaptchaLoaderService = RecaptchaLoaderService_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_LANGUAGE)),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_BASE_URL)),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_NONCE)),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, String, String, String])
], RecaptchaLoaderService);
var RecaptchaLoaderService_1;

const RECAPTCHA_SETTINGS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('recaptcha-settings');

let nextId = 0;
let RecaptchaComponent = class RecaptchaComponent {
    constructor(elementRef, loader, zone, settings) {
        this.elementRef = elementRef;
        this.loader = loader;
        this.zone = zone;
        this.id = `ngrecaptcha-${nextId++}`;
        this.resolved = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        if (settings) {
            this.siteKey = settings.siteKey;
            this.theme = settings.theme;
            this.type = settings.type;
            this.size = settings.size;
            this.badge = settings.badge;
        }
    }
    ngAfterViewInit() {
        this.subscription = this.loader.ready.subscribe((grecaptcha) => {
            if (grecaptcha != null && grecaptcha.render instanceof Function) {
                this.grecaptcha = grecaptcha;
                this.renderRecaptcha();
            }
        });
    }
    ngOnDestroy() {
        // reset the captcha to ensure it does not leave anything behind
        // after the component is no longer needed
        this.grecaptchaReset();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    /**
     * Executes the invisible recaptcha.
     * Does nothing if component's size is not set to "invisible".
     */
    execute() {
        if (this.size !== 'invisible') {
            return;
        }
        if (this.widget != null) {
            this.grecaptcha.execute(this.widget);
        }
        else {
            // delay execution of recaptcha until it actually renders
            this.executeRequested = true;
        }
    }
    reset() {
        if (this.widget != null) {
            if (this.grecaptcha.getResponse(this.widget)) {
                // Only emit an event in case if something would actually change.
                // That way we do not trigger "touching" of the control if someone does a "reset"
                // on a non-resolved captcha.
                this.resolved.emit(null);
            }
            this.grecaptchaReset();
        }
    }
    /** @internal */
    expired() {
        this.resolved.emit(null);
    }
    /** @internal */
    captchaResponseCallback(response) {
        this.resolved.emit(response);
    }
    /** @internal */
    grecaptchaReset() {
        if (this.widget != null) {
            this.zone.runOutsideAngular(() => this.grecaptcha.reset(this.widget));
        }
    }
    /** @internal */
    renderRecaptcha() {
        this.widget = this.grecaptcha.render(this.elementRef.nativeElement, {
            badge: this.badge,
            callback: (response) => {
                this.zone.run(() => this.captchaResponseCallback(response));
            },
            'expired-callback': () => {
                this.zone.run(() => this.expired());
            },
            sitekey: this.siteKey,
            size: this.size,
            tabindex: this.tabIndex,
            theme: this.theme,
            type: this.type,
        });
        if (this.executeRequested === true) {
            this.executeRequested = false;
            this.execute();
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('attr.id'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], RecaptchaComponent.prototype, "id", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], RecaptchaComponent.prototype, "siteKey", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], RecaptchaComponent.prototype, "theme", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], RecaptchaComponent.prototype, "type", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], RecaptchaComponent.prototype, "size", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], RecaptchaComponent.prototype, "tabIndex", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], RecaptchaComponent.prototype, "badge", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], RecaptchaComponent.prototype, "resolved", void 0);
RecaptchaComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        exportAs: 'reCaptcha',
        selector: 're-captcha',
        template: ``
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_SETTINGS)),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
        RecaptchaLoaderService,
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], Object])
], RecaptchaComponent);

let RecaptchaCommonModule = class RecaptchaCommonModule {
};
RecaptchaCommonModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            RecaptchaComponent,
        ],
        exports: [
            RecaptchaComponent,
        ],
    })
], RecaptchaCommonModule);

let RecaptchaModule = RecaptchaModule_1 = class RecaptchaModule {
    // We need this to maintain backwards-compatibility with v4. Removing this will be a breaking change
    static forRoot() {
        return RecaptchaModule_1;
    }
};
RecaptchaModule = RecaptchaModule_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        exports: [
            RecaptchaComponent,
        ],
        imports: [
            RecaptchaCommonModule,
        ],
        providers: [
            RecaptchaLoaderService,
        ],
    })
], RecaptchaModule);
var RecaptchaModule_1;

const RECAPTCHA_V3_SITE_KEY = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('recaptcha-v3-site-key');
/**
 * The main service for working with reCAPTCHA v3 APIs.
 *
 * Use the `execute` method for executing a single action, and
 * `onExecute` observable for listening to all actions at once.
 */
let ReCaptchaV3Service = class ReCaptchaV3Service {
    constructor(zone, siteKey, 
    // tslint:disable-next-line:no-any
    platformId, baseUrl, nonce) {
        /** @internal */
        this.onLoadComplete = (grecaptcha) => {
            this.grecaptcha = grecaptcha;
            if (this.actionBacklog && this.actionBacklog.length > 0) {
                this.actionBacklog.forEach(([action, subject]) => this.executeActionWithSubject(action, subject));
                this.actionBacklog = undefined;
            }
        };
        this.zone = zone;
        this.isBrowser = Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(platformId);
        this.siteKey = siteKey;
        this.nonce = nonce;
        this.baseUrl = baseUrl;
        this.init();
    }
    get onExecute() {
        if (!this.onExecuteSubject) {
            this.onExecuteSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
            this.onExecuteObservable = this.onExecuteSubject.asObservable();
        }
        return this.onExecuteObservable;
    }
    /**
     * Executes the provided `action` with reCAPTCHA v3 API.
     * Use the emitted token value for verification purposes on the backend.
     *
     * For more information about reCAPTCHA v3 actions and tokens refer to the official documentation at
     * https://developers.google.com/recaptcha/docs/v3.
     *
     * @param {string} action the action to execute
     * @returns {Observable<string>} an `Observable` that will emit the reCAPTCHA v3 string `token` value whenever ready.
     * The returned `Observable` completes immediately after emitting a value.
     */
    execute(action) {
        const subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        if (this.isBrowser) {
            if (!this.grecaptcha) {
                // todo: add to array of later executions
                if (!this.actionBacklog) {
                    this.actionBacklog = [];
                }
                this.actionBacklog.push([action, subject]);
            }
            else {
                this.executeActionWithSubject(action, subject);
            }
        }
        return subject.asObservable();
    }
    /** @internal */
    executeActionWithSubject(action, subject) {
        this.zone.runOutsideAngular(() => {
            // tslint:disable-next-line:no-any
            this.grecaptcha.execute(this.siteKey, { action }).then((token) => {
                this.zone.run(() => {
                    subject.next(token);
                    subject.complete();
                    if (this.onExecuteSubject) {
                        this.onExecuteSubject.next({ action, token });
                    }
                });
            });
        });
    }
    /** @internal */
    init() {
        if (this.isBrowser) {
            if ('grecaptcha' in window) {
                this.grecaptcha = grecaptcha;
            }
            else {
                loadScript(this.siteKey, this.onLoadComplete, '', this.baseUrl, this.nonce);
            }
        }
    }
};
ReCaptchaV3Service = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_V3_SITE_KEY)),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_BASE_URL)),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(RECAPTCHA_NONCE)),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], String, Object, String, String])
], ReCaptchaV3Service);

let RecaptchaV3Module = class RecaptchaV3Module {
};
RecaptchaV3Module = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        providers: [
            ReCaptchaV3Service,
        ],
    })
], RecaptchaV3Module);

let RecaptchaValueAccessorDirective = RecaptchaValueAccessorDirective_1 = class RecaptchaValueAccessorDirective {
    constructor(host) {
        this.host = host;
    }
    writeValue(value) {
        if (!value) {
            this.host.reset();
        }
    }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
    onResolve($event) {
        if (this.onChange) {
            this.onChange($event);
        }
        if (this.onTouched) {
            this.onTouched();
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('resolved', ['$event']),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [String]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], RecaptchaValueAccessorDirective.prototype, "onResolve", null);
RecaptchaValueAccessorDirective = RecaptchaValueAccessorDirective_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        providers: [
            {
                multi: true,
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
                // tslint:disable-next-line:no-forward-ref
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => RecaptchaValueAccessorDirective_1),
            },
        ],
        // tslint:disable-next-line:directive-selector
        selector: 're-captcha[formControlName],re-captcha[formControl],re-captcha[ngModel]',
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [RecaptchaComponent])
], RecaptchaValueAccessorDirective);
var RecaptchaValueAccessorDirective_1;

let RecaptchaFormsModule = class RecaptchaFormsModule {
};
RecaptchaFormsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            RecaptchaValueAccessorDirective,
        ],
        exports: [RecaptchaValueAccessorDirective],
        imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], RecaptchaCommonModule],
    })
], RecaptchaFormsModule);

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=ng-recaptcha.js.map


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/fade/fade.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/fade/fade.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div *ngIf=\"show\" class=\"fade\" [@state]=\"state\" (@state.done)=\"animationDone($event)\">\n  <ng-content #fadeableContent></ng-content>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/register/register.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/register/register.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"center-screen\" [ngStyle]=\"{\n  'background-image': 'url(' + bgRegisterImg + ')'\n}\" *ngIf=\"!this.as.currentUserValue\">\n  <div class=\"container py-3\">\n    <div class=\"row justify-content-center no-gutters\">\n      <div class=\"col-lg-7 col-md-9\">\n        <div class=\"card\">\n          <div class=\"card-body\">\n            <form [formGroup]=\"fg\" class=\"m-2\">\n              <div class=\"text-center mb-4\">\n                <img class=\"mb-4\" src=\"/favicon.ico\" alt=\"\" />\n                <h1 class=\"h3 mb-3 font-weight-normal\">Hai, Selamat Datang! >_<\"</h1>\n                <p class=\"text-danger\">{{ registerInfo }}</p>\n              </div>\n              <app-fade [show]=\"registerStep == 1\">\n                <div class=\"form-group row\">\n                  <label for=\"nik\" class=\"col-md-4 col-form-label text-md-right\">NIK</label>\n                  <div class=\"col-md-8\">\n                    <input type=\"text\" id=\"nik\" [attr.disabled]=\"registerStep != 1 ? '' : null\" class=\"form-control {{\n                      !fg.get('nik').valid && fg.get('nik').touched ? 'is-invalid' : ''\n                    }}\" placeholder=\"Nomor Induk Kependudukan\" required autofocus formControlName=\"nik\" autocomplete=\"off\" />\n                    <span class=\"invalid-feedback\" role=\"alert\">\n                      <strong>NIK Tidak Valid!</strong>\n                    </span>\n                    <span role=\"alert\" *ngIf=\"registerErrorData && registerErrorData.nik\" style=\"font-size: 80%; color: #dc3545;\">\n                      <strong>{{ registerErrorData.nik }}</strong>\n                    </span>\n                  </div>\n                </div>\n                <div class=\"form-group row\">\n                  <label for=\"name\" class=\"col-md-4 col-form-label text-md-right\">Nama</label>\n                  <div class=\"col-md-8\">\n                    <input type=\"text\" id=\"name\" [attr.disabled]=\"registerStep != 1 ? '' : null\" class=\"form-control {{\n                      !fg.get('name').valid && fg.get('name').touched ? 'is-invalid' : ''\n                    }}\" placeholder=\"Nama Lengkap\" required formControlName=\"name\" autocomplete=\"off\" />\n                    <span class=\"invalid-feedback\" role=\"alert\">\n                      <strong>Nama Tidak Boleh Kosong!</strong>\n                    </span>\n                  </div>\n                </div>\n              </app-fade>\n              <app-fade [show]=\"registerStep == 2\">\n                <div class=\"form-group row\">\n                  <label for=\"email\" class=\"col-md-4 col-form-label text-md-right\">E-Mail</label>\n                  <div class=\"col-md-8\">\n                    <input type=\"email\" id=\"email\" [attr.disabled]=\"registerStep != 2 ? '' : null\" class=\"form-control {{\n                      !fg.get('email').valid && fg.get('email').touched ? 'is-invalid' : ''\n                    }}\" placeholder=\"Alamat Surat Elektronik\" required autofocus formControlName=\"email\" autocomplete=\"off\" />\n                    <span class=\"invalid-feedback\" role=\"alert\">\n                      <strong>Format Email Tidak Benar!</strong>\n                    </span>\n                    <span role=\"alert\" *ngIf=\"registerErrorData && registerErrorData.email\" style=\"font-size: 80%; color: #dc3545;\">\n                      <strong>{{ registerErrorData.email }}</strong>\n                    </span>\n                  </div>\n                </div>\n                <div class=\"form-group row\">\n                  <label for=\"phone\" class=\"col-md-4 col-form-label text-md-right\">No. HP</label>\n                  <div class=\"col-md-8\">\n                    <input type=\"text\" id=\"phone\" [attr.disabled]=\"registerStep != 2 ? '' : null\" class=\"form-control {{\n                      !fg.get('phone').valid && fg.get('phone').touched ? 'is-invalid' : ''\n                    }}\" placeholder=\"Nomor Telepon Genggam\" required formControlName=\"phone\" autocomplete=\"off\" />\n                    <span class=\"invalid-feedback\" role=\"alert\">\n                      <strong>Telepon Tidak Valid!</strong>\n                    </span>\n                    <span role=\"alert\" *ngIf=\"registerErrorData && registerErrorData.phone\" style=\"font-size: 80%; color: #dc3545;\">\n                      <strong>{{ registerErrorData.phone }}</strong>\n                    </span>\n                  </div>\n                </div>\n                <div class=\"form-group row\">\n                  <label for=\"password\" class=\"col-md-4 col-form-label text-md-right\">Kata Sandi</label>\n                  <div class=\"col-md-8\">\n                    <div class=\"row\">\n                      <div class=\"col pr-0\">\n                        <input type=\"{{ showPassword ? 'text' : 'password' }}\" id=\"password\" [attr.disabled]=\"registerStep != 2 ? '' : null\" class=\"col form-control {{\n                            !fg.get('password').valid && fg.get('password').touched ? 'is-invalid' : ''\n                          }}\" placeholder=\"Kata Sandi\" required formControlName=\"password\" autocomplete=\"off\" />\n                      </div>\n                      <a class=\"btn btn-link text-secondary px-2 mr-3\" (click)=\"showHidePassword()\">\n                        <i class=\"fa fa-fw fa-eye\" *ngIf=\"showPassword\"></i>\n                        <i class=\"fa fa-fw fa-eye-slash\" *ngIf=\"!showPassword\"></i>\n                      </a>\n                    </div>\n                    <span role=\"alert\" *ngIf=\"!fg.get('password').valid && fg.get('password').touched\" style=\"font-size: 80%; color: #dc3545;\">\n                      <ng-container *ngIf=\"fg.controls['password'].hasError('noPasswordMin'); else elsePassword\">\n                        <strong>Password Minimal 8 Karakter!</strong>\n                      </ng-container>\n                      <ng-template #elsePassword>\n                        <strong>Password Tidak Boleh Kosong!</strong>\n                      </ng-template>\n                    </span>\n                  </div>\n                </div>\n                <div class=\"form-group row\">\n                  <label for=\"reTypePassword\" class=\"col-md-4 col-form-label text-md-right\">Ulangi Kata Sandi</label>\n                  <div class=\"col-md-8\">\n                    <input type=\"password\" id=\"reTypePassword\" [attr.disabled]=\"registerStep != 2 ? '' : null\" class=\"form-control {{\n                      !fg.get('reTypePassword').valid && fg.get('reTypePassword').touched ? 'is-invalid' : ''\n                    }}\" placeholder=\"Konfirmasi Password\" required formControlName=\"reTypePassword\" autocomplete=\"off\" />\n                    <span class=\"invalid-feedback\" role=\"alert\">\n                      <ng-container *ngIf=\"fg.controls['reTypePassword'].hasError('noPasswordMatch');else elseConfPass\">\n                        <strong>Password Tidak Sesuai!</strong>\n                      </ng-container>\n                      <ng-template #elseConfPass>\n                        <strong>Password Tidak Boleh Kosong!</strong>\n                      </ng-template>\n                    </span>\n                  </div>\n                </div>\n              </app-fade>\n              <app-fade [show]=\"registerStep == 3\">\n                <div class=\"form-group row\">\n                  <label for=\"ethAccount\" class=\"col-md-4 col-form-label text-md-right\">Punya Ethereum?</label>\n                  <div class=\"col-md-8\">\n                    <select id=\"ethAccount\" class=\"form-control {{\n                        !fg.get('ethAccount').valid && fg.get('ethAccount').touched ? 'is-invalid' : ''\n                      }}\" name=\"ethAccount\" required formControlName=\"ethAccount\">\n                      <option value=\"\" disabled>Pilih Salah Satu!</option>\n                      <option value=\"tidak\">Tidak, Buat Akun Baru Sekarang</option>\n                      <option value=\"ya\">Ya, Gunakan Akun Lama Saya</option>\n                    </select>\n                    <span class=\"invalid-feedback\" role=\"alert\">\n                      <strong>Pilih Salah Satu!</strong>\n                    </span>\n                  </div>\n                </div>\n                <div class=\"form-group row\">\n                  <label for=\"ethAccountImport\" class=\"col-md-4 col-form-label text-md-right\">Private Key</label>\n                  <div class=\"col-md-8\">\n                    <div class=\"custom-file\">\n                      <input type=\"file\" class=\"custom-file-input\" id=\"ethAccountFile\"\n                        (change)=\"onFileSelected($event)\" [disabled]=\"registerFormVal.ethAccount != 'ya'\" />\n                      <label class=\"custom-file-label text-truncate\" for=\"ethAccountFile\" style=\"z-index: 0;\">{{ secretKeyFileName }}</label>\n                    </div>\n                    <textarea id=\"ethAccountImport\" rows=\"5\" [attr.disabled]=\"registerFormVal.ethAccount != 'ya' ? '' : null\"\n                      class=\"form-control\" placeholder=\"{{ secretKeyFileContent }}\" formControlName=\"ethAccountImport\">\n                    </textarea>\n                    <span role=\"alert\" *ngIf=\"registerErrorData && registerErrorData.ethAccountImport\" style=\"font-size: 80%; color: #dc3545;\">\n                      <strong>{{ registerErrorData.ethAccountImport }}</strong>\n                    </span>\n                  </div>\n                </div>\n                <div class=\"form-group row\">\n                  <label for=\"walletPassword\" class=\"col-md-4 col-form-label text-md-right\">Wallet Password</label>\n                  <div class=\"col-md-8\">\n                    <input type=\"password\" id=\"walletPassword\" class=\"form-control\" [attr.disabled]=\"registerFormVal.ethAccount != 'ya' ? '' : null\"\n                      placeholder=\"Wallet Passphrase / Password\" formControlName=\"walletPassword\" autocomplete=\"off\" />\n                    <span class=\"invalid-feedback\" role=\"alert\">\n                      <strong>Wallet Tidak Boleh Kosong!</strong>\n                    </span>\n                  </div>\n                </div>\n              </app-fade>\n              <div class=\"form-group row\" *ngIf=\"registerStep == 1\">\n                <div class=\"col-md-8 offset-md-4\">\n                  <re-captcha #captchaRef formControlName=\"googleCaptchaResponse\" siteKey=\"6Ld4Bt4UAAAAAKJQ_jfqtWdsq9BuARLHag2DBvqK\"\n                    (resolved)=\"resolved($event, captchaRef)\"></re-captcha>\n                </div>\n              </div>\n              <div class=\"form-group row mb-0\">\n                <div class=\"col-md-4 text-md-right\">\n                  <button class=\"btn btn-link btn-block text-decoration-none\" type=\"button\" routerLink=\"/login\" [disabled]=\"submitted\">Sudah Punya Akun?</button>\n                </div>\n                <div class=\"col-md-8\">\n                  <div class=\"row\">\n                    <div class=\"col-6 pr-0\">\n                      <button class=\"btn btn-link btn-block\" type=\"button\" [disabled]=\"registerStep > 3\" (click)=\"onRegisterPrevious()\">\n                        <i class=\"fa fa-fw fa-arrow-left\"></i>\n                        Previous\n                      </button>\n                    </div>\n                    <div class=\"col-6 pl-0\">\n                      <button class=\"btn btn-success btn-block text-white\" type=\"button\" (click)=\"onRegisterNext()\"\n                        [disabled]=\"\n                          registerStep == 1 && !kpuRiUserData ||\n                          registerStep == 2 && !(\n                            fg.get('email').valid && fg.get('email').touched &&\n                            fg.get('phone').valid && fg.get('phone').touched &&\n                            fg.get('password').valid && fg.get('password').touched &&\n                            fg.get('reTypePassword').valid && fg.get('reTypePassword').touched\n                          ) ||\n                          registerStep == 3 && (\n                            registerFormVal.ethAccount == 'ya' && (\n                              registerFormVal.ethAccountImport == null ||\n                              registerFormVal.ethAccountImport == undefined ||\n                              registerFormVal.ethAccountImport == ''\n                            ) || (\n                              registerFormVal.ethAccount == ''\n                            )\n                          ) ||\n                          submitted\n                        \">\n                        {{ registerStep < 3 ? 'Next' : 'Finish' }}\n                        <i class=\"fa fa-fw fa-arrow-right ml-2\" *ngIf=\"registerStep < 3\"></i>\n                        <i class=\"fa fa-fw fa-check ml-2\" *ngIf=\"registerStep >= 3\"></i>\n                      </button>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-lg-5 col-md-3\" [ngStyle]=\"{\n        'background-position': 'center',\n        'background-size': 'cover',\n        'background-image': 'url(' + registerImg + ')'\n      }\"></div>\n    </div>\n  </div>\n</div>\n\n");

/***/ }),

/***/ "./src/app/_shared/components/fade/fade.component.css":
/*!************************************************************!*\
  !*** ./src/app/_shared/components/fade/fade.component.css ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\r\n  display: block;\r\n}\r\n\r\n.fade {\r\n  opacity: 0;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX3NoYXJlZC9jb21wb25lbnRzL2ZhZGUvZmFkZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFVBQVU7QUFDWiIsImZpbGUiOiJzcmMvYXBwL19zaGFyZWQvY29tcG9uZW50cy9mYWRlL2ZhZGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuLmZhZGUge1xyXG4gIG9wYWNpdHk6IDA7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "./src/app/_shared/components/fade/fade.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/_shared/components/fade/fade.component.ts ***!
  \***********************************************************/
/*! exports provided: FadeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FadeComponent", function() { return FadeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");



let FadeComponent = class FadeComponent {
    get show() {
        return this._show;
    }
    set show(value) {
        if (value) {
            this._show = value;
            this.state = 'visible';
        }
        else {
            this.state = 'hidden';
        }
    }
    animationDone(event) {
        if (event.fromState === 'visible' && event.toState === 'hidden') {
            this._show = false;
        }
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
], FadeComponent.prototype, "show", null);
FadeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-fade',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./fade.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/fade/fade.component.html")).default,
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('state', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('visible', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                    opacity: '1'
                })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('hidden', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                    opacity: '0'
                })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => visible', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('500ms ease-out')]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('visible => hidden', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('500ms ease-out')])
            ])
        ],
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectionStrategy"].OnPush,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./fade.component.css */ "./src/app/_shared/components/fade/fade.component.css")).default]
    })
], FadeComponent);



/***/ }),

/***/ "./src/app/_shared/components/fade/fade.module.ts":
/*!********************************************************!*\
  !*** ./src/app/_shared/components/fade/fade.module.ts ***!
  \********************************************************/
/*! exports provided: FadeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FadeModule", function() { return FadeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _fade_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fade.component */ "./src/app/_shared/components/fade/fade.component.ts");




let FadeModule = class FadeModule {
};
FadeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_fade_component__WEBPACK_IMPORTED_MODULE_3__["FadeComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
        ],
        exports: [_fade_component__WEBPACK_IMPORTED_MODULE_3__["FadeComponent"]]
    })
], FadeModule);



/***/ }),

/***/ "./src/app/_shared/components/register/register.component.css":
/*!********************************************************************!*\
  !*** ./src/app/_shared/components/register/register.component.css ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19zaGFyZWQvY29tcG9uZW50cy9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/_shared/components/register/register.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/_shared/components/register/register.component.ts ***!
  \*******************************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/_shared/services/auth.service.ts");
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/global.service */ "./src/app/_shared/services/global.service.ts");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! crypto-js */ "./node_modules/crypto-js/index.js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/_shared/services/user.service.ts");









let RegisterComponent = class RegisterComponent {
    constructor(fb, gs, router, as, us) {
        this.fb = fb;
        this.gs = gs;
        this.router = router;
        this.as = as;
        this.us = us;
        this.submitted = false;
        this.registerImg = null;
        this.bgRegisterImg = '/assets/img/bg-login.svg';
        this.registerInfo = 'Ayo bergabung dengan kami~';
        this.registerErrorData = null;
        this.kpuRiUserData = null;
        this.showPassword = false;
        this.googleCaptcha = null;
        this.secretKeyFileName = 'Upload ETH UTC File ..';
        this.secretKeyFileContent = 'Or Paste Ethereum Private Key String Here ..';
        this.ethereumAddressCreatedImported = null;
        this.registerStep = 0;
        if (this.as.currentUserValue) {
            this.router.navigate(['/home']);
        }
        this.registerImg = 'https://via.placeholder.com/462x532/' + this.gs.randomColor;
    }
    get registerFormVal() {
        return this.fg.value;
    }
    ngOnInit() {
        this.registerStep = 1;
        this.initializeForm();
    }
    showHidePassword() {
        this.showPassword = !this.showPassword;
    }
    initializeForm(data = null) {
        this.fg = this.fb.group({
            nik: [data ? data.nik : null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(16),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(16),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern('^[0-9]*$')
                ])
            ],
            name: [data ? data.nama : null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            email: [data ? data.email : null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required
                ])
            ],
            phone: [data ? data.phone : null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(9),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(13),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern('^[0-9]*$')
                ])
            ],
            password: [data ? data.password : null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(8)
                ])
            ],
            reTypePassword: [data ? data.reTypePassword : null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            googleCaptchaResponse: [data ? data.googleCaptchaResponse : null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            ethAccount: [data ? data.ethAccount : '', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            ethAccountImport: [data ? data.ethAccountImport : null],
            walletPassword: [data ? data.walletPassword : null]
        }, {
            validator: this.customValidator
        });
    }
    customValidator(control) {
        const password = control.get('password').value;
        const confirmPassword = control.get('reTypePassword').value;
        if (password != null && password !== undefined && password !== '' && password.length < 8) {
            control.get('password').setErrors({ noPasswordMin: true });
        }
        if (confirmPassword != null && confirmPassword !== undefined && confirmPassword !== '' && password !== confirmPassword) {
            control.get('reTypePassword').setErrors({ noPasswordMatch: true });
        }
    }
    resolved(captchaResponse, captchaRef) {
        this.gs.log(`[GOOGLE_CAPTCHA] ${captchaResponse}`);
        this.registerErrorData = null;
        this.googleCaptcha = captchaRef;
        this.fg.value.googleCaptchaResponse = captchaResponse;
        if (captchaResponse) {
            this.registerInfo = 'Sedang Mengambil Data ..';
            const registerTimedOut = setTimeout(() => {
                this.registerInfo = 'Server Tidak Merespon, Silahkan Coba Lagi Nanti ..';
            }, 60 * 1000);
            this.us.cekNik({
                nik: this.fg.value.nik,
                name: this.fg.value.name,
                'g-recaptcha-response': this.fg.value.googleCaptchaResponse
            }).subscribe(res => {
                this.gs.log('[KPU_RI-CEK_NIK]', res);
                if (res.result.message === 'failed') {
                    this.registerInfo = res.result.data.pesan;
                    this.fg.value.googleCaptchaResponse = null;
                    this.kpuRiUserData = null;
                    this.googleCaptcha.reset();
                }
                else if (res.result.message === 'success') {
                    this.kpuRiUserData = Object.assign({}, res.result.data, { nik: this.fg.value.nik });
                    Object.keys(this.kpuRiUserData).forEach((key, idx) => {
                        this.kpuRiUserData[key] = this.kpuRiUserData[key].toLowerCase().replace(/\b[a-zA-Z]/g, (v) => v.toUpperCase());
                    });
                    this.registerInfo = `
              ${this.kpuRiUserData.nama} - ${this.kpuRiUserData.jenis_kelamin} - ${this.kpuRiUserData.tempat_lahir} -
              ${this.kpuRiUserData.nik} - ${this.kpuRiUserData.namaKel} - ${this.kpuRiUserData.namaKec} -
              ${this.kpuRiUserData.namaKabko} - ${this.kpuRiUserData.namaPropinsi}
            `.replace(/\n/g, ' ').replace(/ +(?= )/g, '').trim();
                    this.fg.controls.nik.disable();
                    this.fg.controls.name.disable();
                    this.initializeForm(Object.assign({}, this.kpuRiUserData, this.fg.value));
                }
                clearTimeout(registerTimedOut);
            }, err => {
                this.registerInfo = err.error.result.message || err.result.message || err.result.data.pesan;
                this.googleCaptcha.reset();
                clearTimeout(registerTimedOut);
            });
        }
    }
    onRegisterPrevious() {
        if (this.registerStep <= 1) {
            this.registerStep = 1;
        }
        else {
            this.registerStep -= 1;
        }
    }
    onRegisterNext() {
        this.registerErrorData = null;
        if (this.registerStep === 1) {
            this.checkWebAccount({
                nik: this.kpuRiUserData.nik
            });
        }
        else if (this.registerStep === 2) {
            this.checkWebAccount({
                phone: this.fg.value.phone,
                email: this.fg.value.email
            });
        }
        else if (this.registerStep === 3) {
            this.settingUpEthereumAccount();
        }
    }
    checkWebAccount(formData) {
        this.registerInfo = 'Mengecek Data Akun ...';
        this.us.cekAccount(formData).subscribe((res) => {
            this.registerInfo = res.result.message;
            this.registerStep += 1;
        }, err => {
            this.registerInfo = err.error.result.message || err.error.info;
            this.registerErrorData = err.error.result || err.error.info;
            if ('nik' in formData) {
                this.kpuRiUserData = null;
                this.fg.controls.nik.enable();
                this.fg.controls.name.enable();
                this.googleCaptcha.reset();
            }
        });
    }
    registerWebAccount() {
        const userData = {
            nik: this.kpuRiUserData.nik,
            name: this.kpuRiUserData.nama,
            phone: this.fg.value.phone,
            email: this.fg.value.email,
            pubKey: this.ethereumAddressCreatedImported,
            password: crypto_js__WEBPACK_IMPORTED_MODULE_6__["SHA512"](this.fg.value.password).toString()
        };
        this.gs.log('[REGISTER_WEB_ACCOUNT]', userData);
        if (this.kpuRiUserData) {
            this.us.registerAccount(userData).subscribe((res) => {
                localStorage.setItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].tokenName, res.result.token);
                this.as.verify(localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].tokenName)).subscribe(success => this.router.navigate(['/home']), error => this.as.logout());
            }, err => {
                this.registerInfo = err.error.result.message || err.error.info;
                this.registerErrorData = err.error.result;
                this.submitted = false;
            });
        }
    }
    onFileSelected($event) {
        if ($event.target.files.length > 0) {
            const selectedFile = $event.target.files[0];
            const reader = new FileReader();
            reader.readAsText(selectedFile);
            reader.onload = (e) => {
                this.secretKeyFileName = selectedFile.name;
                this.fg.controls.ethAccountImport.patchValue(e.target.result);
            };
        }
        this.secretKeyFileName = 'Tidak Ada File Dipilih!';
        this.fg.controls.ethAccountImport.patchValue(null);
    }
    settingUpEthereumAccount() {
        this.submitted = true;
        this.registerInfo = 'Harap Menunggu ...';
        if (this.fg.value.ethAccount === 'tidak') {
            this.us.newEthAccount({
                password: window.btoa(this.fg.value.password)
            }).subscribe(res => {
                this.registerInfo = res.result.account.pubKey;
                this.ethereumAddressCreatedImported = res.result.account.pubKey;
                // const receipt = res.result.trxTransferCoin;
                this.registerWebAccount();
            }, err => {
                this.submitted = false;
                this.registerInfo = err.error.result.message || err.error.info;
            });
        }
        else if (this.fg.value.ethAccount === 'ya') {
            if (this.fg.value.ethAccountImport === null ||
                this.fg.value.ethAccountImport === undefined ||
                this.fg.value.ethAccountImport === '') {
                return;
            }
            let wallet = false;
            let secretKey = this.fg.value.ethAccountImport;
            let walletPassword = window.btoa(this.fg.value.password);
            try {
                secretKey = JSON.parse(secretKey);
                wallet = true;
                walletPassword = window.btoa(this.fg.value.walletPassword);
            }
            catch (e) {
                this.fg.controls.walletPassword.patchValue(null);
            }
            this.us.importEthAccount({
                password: walletPassword,
                wallet, secretKey: this.fg.value.ethAccountImport
            }).subscribe(res => {
                this.registerInfo = res.result.account.pubKey;
                this.ethereumAddressCreatedImported = res.result.account.pubKey;
                // const receipt = res.result.trxTransferCoin;
                this.registerWebAccount();
            }, err => {
                this.submitted = false;
                this.registerInfo = err.error.result.message || err.error.info;
            });
        }
    }
};
RegisterComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: _services_global_service__WEBPACK_IMPORTED_MODULE_5__["GlobalService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _services_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"] }
];
RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-register',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./register.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/register/register.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./register.component.css */ "./src/app/_shared/components/register/register.component.css")).default]
    })
], RegisterComponent);



/***/ }),

/***/ "./src/app/_shared/components/register/register.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/_shared/components/register/register.module.ts ***!
  \****************************************************************/
/*! exports provided: RegisterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-recaptcha */ "./node_modules/ng-recaptcha/fesm2015/ng-recaptcha.js");
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./register.component */ "./src/app/_shared/components/register/register.component.ts");
/* harmony import */ var _fade_fade_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../fade/fade.module */ "./src/app/_shared/components/fade/fade.module.ts");








const routes = [
    {
        path: '',
        component: _register_component__WEBPACK_IMPORTED_MODULE_6__["RegisterComponent"]
    }
];
let RegisterModule = class RegisterModule {
};
RegisterModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_register_component__WEBPACK_IMPORTED_MODULE_6__["RegisterComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            ng_recaptcha__WEBPACK_IMPORTED_MODULE_5__["RecaptchaModule"],
            ng_recaptcha__WEBPACK_IMPORTED_MODULE_5__["RecaptchaFormsModule"],
            _fade_fade_module__WEBPACK_IMPORTED_MODULE_7__["FadeModule"]
        ]
    })
], RegisterModule);



/***/ })

}]);
//# sourceMappingURL=_shared-components-register-register-module-es2015.js.map