(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/footer/footer.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/footer/footer.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Footer -->\n<footer>\n  <div class=\"gitHub ShadowsIntoLight d-none d-md-block\" style=\"float: right; font-size: 12px;\">\n    <a href=\"https://github.com/bifeldy/blockchain-evoting\" target=\"_blank\" rel=\"noreferrer\">\n      <i class=\"fa fa-fw fa-code-branch\"></i>\n      {{ githubLastCommit ? githubLastCommit.commit.message : '' }}\n    </a>\n    &nbsp;\n  </div>\n  <div class=\"bifeldy-footer ShadowsIntoLight\" style=\"float: left; font-size: 12px;\">\n    &nbsp;\n    <span class=\"copyleft\">\n      <font color=\"#20ff6b\">&copy; </font>\n    </span> \n    <font color=\"#ffffff\"> 2012 </font>\n    <font color=\"#00FFFF\">All-Wrong </font>\n    <font color=\"#fbce78\">UnReserved. </font>\n    <font color=\"#000000\">|| </font>\n    <font color=\"#20ff6b\">B. </font>\n    <font color=\"#ffffff\">Bias </font>\n    <font color=\"#00FFFF\">A. </font>\n    <font color=\"#fbce78\">Ch. </font>\n    &nbsp;\n  </div>\n</footer>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/header/header.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/header/header.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Header -->\n<header class=\"CormorantGaramond\" (window:resize)=\"onWindowResize($event)\">\n\n  <!-- Topnav Menu Atas, Mobile/Tablets -->\n  <nav class=\"navbar fixed-top shadow\">\n    <a id=\"homeButton\" class=\"navbar-brand bifeldy-logo\" routerLink=\"/home\" style=\"color: whitesmoke;\">\n      <img src=\"/favicon.ico\" height=\"30\" />\n    </a>\n    <ul class=\"nav justify-content-end\">\n      <li class=\"nav-item d-none d-md-block mr-2\">\n        <form class=\"form-inline bifeldy-search-container mr-1\" action=\"/search\">\n          <input type=\"text\" placeholder=\"Ada yang bisa dibantu?\" aria-label=\"Search-Box\" name=\"q\" autocomplete=\"off\" />\n          <button type=\"submit\" aria-label=\"search-button\" title=\"Pencarian\">\n            <i class=\"fa fa-search\"></i>\n          </button>\n        </form>\n      </li>\n      <li class=\"nav-item\" *ngIf=\"currentUser\">\n        <a id=\"notif-open-close\" class=\"btn-link text-light pt-2\" onclick=\"\" title=\"Pemberitahuan\">\n          <i class=\"fa fa-bell mr-1\" style=\"font-size: 28px; padding-top: 3px; cursor: pointer;\"></i>\n        </a>\n      </li>\n      <li class=\"nav-item d-md-none ml-2\">\n        <a id=\"nav-open-close\" class=\"btn-link text-light\" onclick=\"mobileShowHideNavbar();\" title=\"Daftar Menu\">\n          <i class=\"fa fa-fw fa-bars mr-1\" style=\"font-size: 28px; padding-top: 3px;\"></i>\n        </a>\n      </li>\n    </ul>\n  </nav>\n\n  <!-- Font Icon Lihat Di Sini -- https://www.w3schools.com/icons/fontawesome_icons_webapp.asp -->\n\n  <!-- Navbar Menu -->\n  <div id=\"navbar\" class=\"bifeldy-navbar\" onmouseover=\"navbarShowHide();\" onmouseout=\"navbarShowHide();\" onclick=\"mobileShowHideNavbar();\">\n    <div class=\"clearfix d-none d-md-block\"> &nbsp; </div>\n    <div class=\"clearfix d-md-none\"> &nbsp; </div>\n    <div class=\"clearfix\"> &nbsp; </div>\n    <div class=\"clearfix\"> &nbsp; </div>\n    <div class=\"d-md-none\">\n      <form class=\"bifeldy-search-container\" action=\"/search\">\n        <input type=\"text\" placeholder=\"Ada yang bisa dibantu?\" aria-label=\"Search-Box\" name=\"q\" />\n        <button type=\"submit\" aria-label=\"search-button\">\n          <i class=\"fa fa-search\"></i>\n        </button>\n      </form>\n    </div>\n    <hr class=\"style1 d-md-none\" />\n    <a *ngIf=\"currentUser; then sudahLogin; else belumLogin;\"></a>\n    <ng-template #sudahLogin>\n      <a routerLink=\"/user/{{ currentUser.pubKey }}\" routerLinkActive=\"bifeldy-active\">\n        <i class=\"fa fa-fw fa-user mr-2\"></i>\n        <div class=\"visibleMenu\">\n          {{ slicedUserName }}\n        </div>\n      </a>\n      <a routerLink=\"/logout\" routerLinkActive=\"bifeldy-active\" (click)=\"logout();\">\n        <i class=\"fa fa-fw fa-sign-out-alt mr-2\"></i>\n        <div class=\"visibleMenu\">Keluar</div>\n      </a>\n    </ng-template>\n    <ng-template #belumLogin>\n      <a routerLink=\"/login\" routerLinkActive=\"bifeldy-active\">\n        <i class=\"fa fa-fw fa-sign-in-alt mr-2\"></i>\n        <div class=\"visibleMenu\">Masuk</div>\n      </a>\n      <a routerLink=\"/register\" routerLinkActive=\"bifeldy-active\">\n        <i class=\"fa fa-fw fa-user-plus mr-2\"></i>\n        <div class=\"visibleMenu\">Daftar</div>\n      </a>\n    </ng-template>\n    <hr class=\"style1\" />\n    <a routerLink=\"/home\" routerLinkActive=\"bifeldy-active\">\n      <i class=\"fa fa-fw fa-home mr-2\"></i>\n      <div class=\"visibleMenu\">Home Page</div>\n    </a>\n    <a routerLink=\"/explorer\" routerLinkActive=\"bifeldy-active\">\n      <i class=\"fa fa-fw fa-folder-open mr-2\"></i>\n      <div class=\"visibleMenu\">Block Explorer</div>\n    </a>\n    <a routerLink=\"/status\" routerLinkActive=\"bifeldy-active\">\n      <i class=\"fa fa-fw fa-wifi mr-2\"></i>\n      <div class=\"visibleMenu\">Network Status</div>\n    </a>\n    <hr class=\"style1\" />\n    <a *ngIf=\"currentUser; then loggedIn\"></a>\n    <ng-template #loggedIn>\n      <a *ngIf=\"isAdmin || isMiner || isVoter\" routerLink=\"/library\" routerLinkActive=\"bifeldy-active\" [routerLinkActiveOptions]=\"{ exact: true }\">\n        <i class=\"fa fa-fw fa-vote-yea mr-2\"></i>\n        <div class=\"visibleMenu\">My Election</div>\n      </a>\n      <a *ngIf=\"isAdmin || isMiner || isVoter\" routerLink=\"/library/create\" routerLinkActive=\"bifeldy-active\">\n        <i class=\"fa fa-fw fa-plus mr-2\"></i>\n        <div class=\"visibleMenu\">Create New Election</div>\n      </a>\n      <a *ngIf=\"isAdmin\" routerLink=\"/admin\" routerLinkActive=\"bifeldy-active\">\n        <i class=\"fa fa-fw fa-cogs mr-2\"></i>\n        <div class=\"visibleMenu\">Admin Panel</div>\n      </a>\n      <hr class=\"style1\" />\n      <a *ngIf=\"isAdmin || isMiner || isVoter\"  routerLink=\"/fund\" routerLinkActive=\"bifeldy-active\">\n        <i class=\"fab fa-fw fa-ethereum mr-2\"></i>\n        <div class=\"visibleMenu\">{{ this.us.myCoinBase.ether.toString() | slice:0:10 }} Ether</div>\n      </a>\n      <hr class=\"style1\" />\n    </ng-template>\n    <a href=\"https://discord.gg/xGWdExk\" target=\"_blank\" rel=\"noreferrer\">\n      <i class=\"fa mr-2\">\n        <svg viewBox=\"-357 161 245 240\" style=\"margin-left: 3px; margin-right: 2px; height: 20px;\">\n          <path fill=\"#fff\"\n            d=\"M-145.3 217.1c-29.2-21.9-57-21.3-57-21.3l-2.8 3.2c34.5 10.5 50.5 25.8 50.5\n              25.8-21.1-11.6-41.8-17.2-61-19.5-14.6-1.6-28.6-1.2-41 .4-1.2 0-2.2.2-3.4.4-7.1.6-24.3 3.2-46\n              12.8-7.5 3.4-12 5.9-12 5.9s16.8-16 53.3-26.6l-2-2.4s-27.8-.6-57 21.3c0 0-29.2 52.9-29.2 118.2\n              0 0 17 29.4 61.8 30.8 0 0 7.5-9.1 13.6-16.8-25.8-7.7-35.5-23.9-35.5-23.9s2 1.4 5.7\n              3.4c.2.2.4.4.8.6.6.4 1.2.6 1.8 1 5.1 2.8 10.1 5.1 14.8 6.9 8.3 3.2 18.2 6.5 29.8 8.7 15.2\n              2.8 33.1 3.9 52.5.2 9.5-1.6 19.3-4.5 29.4-8.7 7.1-2.6 15-6.5 23.3-12 0 0-10.1 16.6-36.7\n              24.1 6.1 7.7 13.4 16.4 13.4 16.4 44.8-1.4 62-30.8 62-30.8.1-65.1-29.1-118.1-29.1-118.1zm-127.1\n              99.4c-11.4 0-20.7-10.1-20.7-22.5s9.1-22.5 20.7-22.5 20.9 10.1 20.7 22.5c0 12.3-9.2 22.5-20.7\n              22.5zm74 0c-11.4 0-20.7-10.1-20.7-22.5s9.1-22.5 20.7-22.5 20.7 10.1 20.7 22.5c0 12.3-9.2 22.5-20.7 22.5z\">\n          </path>\n        </svg>\n      </i>\n      <div class=\"visibleMenu\">Discord</div>\n    </a>\n    <a href=\"https://github.com/bifeldy/blockchain-evoting\" target=\"_blank\" rel=\"noreferrer\">\n      <i class=\"fab fa-fw fa-github mr-2\"></i>\n      <div class=\"visibleMenu\">\n        GitHub :: {{ slicedGithubSha }}\n      </div>\n    </a>\n  </div>\n\n</header>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Header -->\n<app-header></app-header>\n\n<!-- Overlay -->\n<div id=\"overlay\">\n\n  <!-- Overlay Content -->\n  <div class=\"bifeldy text-right text-white\">\n    <h1 class=\"IndieFlower\">\n      {{ title }}\n    </h1>\n    <h2 class=\"NanumPenScript\">\n      {{ description }}\n    </h2>\n    <h5 class=\"Nunito\" id=\"jam\">\n      Clock'z\n    </h5>\n  </div>\n\n</div>\n\n<!-- Content -->\n<main class=\"bifeldy\">\n\n  <!-- Routing Pages -->\n  <router-outlet></router-outlet>\n\n</main>\n\n<!-- Footer -->\n<app-footer></app-footer>\n\n\n<ngx-spinner [bdColor]=\"'#0000007f'\" [type]=\"'square-jelly-box'\" [size]=\"'medium'\" [color]=\"'#e84360'\"></ngx-spinner>");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./src/app/_shared/backends/fake-backend.ts":
/*!**************************************************!*\
  !*** ./src/app/_shared/backends/fake-backend.ts ***!
  \**************************************************/
/*! exports provided: FakeBackendInterceptor, FakeBackendProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeBackendInterceptor", function() { return FakeBackendInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeBackendProvider", function() { return FakeBackendProvider; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");





let FakeBackendInterceptor = class FakeBackendInterceptor {
    intercept(request, next) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(null).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mergeMap"])(handleRoute)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["materialize"])()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["delay"])(500)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["dematerialize"])());
        function handleRoute() {
            switch (true) {
                default:
                    return next.handle(request);
            }
        }
    }
};
FakeBackendInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], FakeBackendInterceptor);

let FakeBackendProvider = {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
    useClass: FakeBackendInterceptor,
    multi: true
};


/***/ }),

/***/ "./src/app/_shared/components/footer/footer.component.css":
/*!****************************************************************!*\
  !*** ./src/app/_shared/components/footer/footer.component.css ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19zaGFyZWQvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/_shared/components/footer/footer.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/_shared/components/footer/footer.component.ts ***!
  \***************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api.service */ "./src/app/_shared/services/api.service.ts");



let FooterComponent = class FooterComponent {
    constructor(api) {
        this.api = api;
        this.githubLastCommit = null;
    }
    ngOnInit() {
        this.api.getData('https://api.github.com/repos/Bifeldy/blockchain-evoting/commits').subscribe(res => this.githubLastCommit = res[0]);
    }
};
FooterComponent.ctorParameters = () => [
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }
];
FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-footer',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./footer.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/footer/footer.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./footer.component.css */ "./src/app/_shared/components/footer/footer.component.css")).default]
    })
], FooterComponent);



/***/ }),

/***/ "./src/app/_shared/components/footer/footer.module.ts":
/*!************************************************************!*\
  !*** ./src/app/_shared/components/footer/footer.module.ts ***!
  \************************************************************/
/*! exports provided: FooterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterModule", function() { return FooterModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer.component */ "./src/app/_shared/components/footer/footer.component.ts");




let FooterModule = class FooterModule {
};
FooterModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
        ],
        exports: [_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]]
    })
], FooterModule);



/***/ }),

/***/ "./src/app/_shared/components/header/header.component.css":
/*!****************************************************************!*\
  !*** ./src/app/_shared/components/header/header.component.css ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19zaGFyZWQvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/_shared/components/header/header.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/_shared/components/header/header.component.ts ***!
  \***************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/_shared/services/auth.service.ts");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api.service */ "./src/app/_shared/services/api.service.ts");
/* harmony import */ var _models_role__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../models/role */ "./src/app/_shared/models/role.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/_shared/services/user.service.ts");






let HeaderComponent = class HeaderComponent {
    constructor(api, as, us) {
        this.api = api;
        this.as = as;
        this.us = us;
        this.githubLastCommit = null;
        this.currentUser = null;
        this.windowWidth = null;
        this.windowHeight = null;
        this.slicedGithubSha = null;
        this.slicedUserName = null;
    }
    ngOnInit() {
        this.windowWidth = window.innerWidth || window.outerWidth;
        this.windowHeight = window.innerHeight || window.outerHeight;
        this.as.currentUser.subscribe(user => {
            this.currentUser = user;
            if (this.currentUser) {
                this.slicedUserName = this.currentUser.name;
                this.sliceName();
                this.us.getAccountBalance(this.currentUser.pubKey);
            }
        });
        this.api.getData('https://api.github.com/repos/Bifeldy/blockchain-evoting/commits').subscribe(res => {
            this.githubLastCommit = res[0];
            if (this.githubLastCommit) {
                this.slicedGithubSha = this.githubLastCommit.sha;
                this.sliceGit();
            }
        });
    }
    get isAdmin() {
        return this.currentUser && this.currentUser.role === _models_role__WEBPACK_IMPORTED_MODULE_4__["Role"].Admin;
    }
    get isMiner() {
        return this.currentUser && this.currentUser.role === _models_role__WEBPACK_IMPORTED_MODULE_4__["Role"].Miner;
    }
    get isVoter() {
        return this.currentUser && this.currentUser.role === _models_role__WEBPACK_IMPORTED_MODULE_4__["Role"].Voter;
    }
    onWindowResize($event) {
        this.windowWidth = $event.target.innerWidth || $event.target.outerWidth;
        this.windowHeight = $event.target.innerHeight || $event.target.outerHeight;
        if (this.currentUser) {
            this.sliceName();
        }
        if (this.githubLastCommit) {
            this.sliceGit();
        }
    }
    sliceName() {
        if (this.currentUser) {
            if (this.windowWidth < 768) {
                this.slicedUserName = this.currentUser.name.slice(0, 30);
                if (this.currentUser && this.currentUser.name.length > 30) {
                    this.slicedUserName = this.slicedUserName.trim() + '...';
                }
            }
            else {
                this.slicedUserName = this.currentUser.name.slice(0, 15);
                if (this.currentUser && this.currentUser.name.length > 15) {
                    this.slicedUserName = this.slicedUserName.trim() + '...';
                }
            }
        }
    }
    sliceGit() {
        if (this.githubLastCommit) {
            if (this.windowWidth < 768) {
                this.slicedGithubSha = this.githubLastCommit.sha.slice(0, 20);
                if (this.githubLastCommit.sha.length > 20) {
                    this.slicedGithubSha = this.slicedGithubSha.trim() + '...';
                }
            }
            else {
                this.slicedGithubSha = this.githubLastCommit.sha.slice(0, 8);
                if (this.githubLastCommit.sha.length > 8) {
                    this.slicedGithubSha = this.slicedGithubSha.trim() + '...';
                }
            }
        }
    }
    logout() {
        this.as.logout();
        location.reload();
    }
};
HeaderComponent.ctorParameters = () => [
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
    { type: _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"] }
];
HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-header',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./header.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/header/header.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./header.component.css */ "./src/app/_shared/components/header/header.component.css")).default]
    })
], HeaderComponent);



/***/ }),

/***/ "./src/app/_shared/components/header/header.module.ts":
/*!************************************************************!*\
  !*** ./src/app/_shared/components/header/header.module.ts ***!
  \************************************************************/
/*! exports provided: HeaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderModule", function() { return HeaderModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header.component */ "./src/app/_shared/components/header/header.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





let HeaderModule = class HeaderModule {
};
HeaderModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]
        ],
        exports: [_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"]]
    })
], HeaderModule);



/***/ }),

/***/ "./src/app/_shared/interceptors/http-error.interceptor.ts":
/*!****************************************************************!*\
  !*** ./src/app/_shared/interceptors/http-error.interceptor.ts ***!
  \****************************************************************/
/*! exports provided: HttpErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpErrorInterceptor", function() { return HttpErrorInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/global.service */ "./src/app/_shared/services/global.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/_shared/services/auth.service.ts");







let HttpErrorInterceptor = class HttpErrorInterceptor {
    constructor(gs, router, as) {
        this.gs = gs;
        this.router = router;
        this.as = as;
    }
    intercept(request, next) {
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(e => {
            this.gs.log(`[INTERCEPT_ERROR-${e.status}]`, e.statusText);
            if (e.status === 401) {
                this.as.logout();
                this.router.navigate(['/login'], { queryParams: { err: true } });
                window.location.reload();
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(e);
        }));
    }
};
HttpErrorInterceptor.ctorParameters = () => [
    { type: _services_global_service__WEBPACK_IMPORTED_MODULE_5__["GlobalService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] }
];
HttpErrorInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], HttpErrorInterceptor);



/***/ }),

/***/ "./src/app/_shared/interceptors/http-request.interceptor.ts":
/*!******************************************************************!*\
  !*** ./src/app/_shared/interceptors/http-request.interceptor.ts ***!
  \******************************************************************/
/*! exports provided: HttpRequestInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpRequestInterceptor", function() { return HttpRequestInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/_shared/services/auth.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/global.service */ "./src/app/_shared/services/global.service.ts");
/* harmony import */ var _services_busy_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/busy.service */ "./src/app/_shared/services/busy.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");







let HttpRequestInterceptor = class HttpRequestInterceptor {
    constructor(gs, as, busyService) {
        this.gs = gs;
        this.as = as;
        this.busyService = busyService;
        this.currentUser = null;
    }
    intercept(request, next) {
        this.as.currentUser.subscribe(user => this.currentUser = user);
        const userToken = localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].tokenName);
        this.busyService.busy();
        if (this.currentUser && userToken && request.url.startsWith(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl)) {
            this.gs.log('[INTERCEPT_REQUEST]', userToken.slice(0, 5) + '*****' + userToken.slice(userToken.length - 5, userToken.length));
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${userToken}`
                }
            });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }
        else {
            if (request.headers.get('Content-Type') === 'multipart/form-data') {
                request = request.clone({
                    headers: request.headers.delete('Content-Type', 'multipart/form-data')
                });
            }
        }
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["finalize"])(() => {
            this.busyService.idle();
        }));
    }
};
HttpRequestInterceptor.ctorParameters = () => [
    { type: _services_global_service__WEBPACK_IMPORTED_MODULE_4__["GlobalService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
    { type: _services_busy_service__WEBPACK_IMPORTED_MODULE_5__["BusyService"] }
];
HttpRequestInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], HttpRequestInterceptor);



/***/ }),

/***/ "./src/app/_shared/models/role.ts":
/*!****************************************!*\
  !*** ./src/app/_shared/models/role.ts ***!
  \****************************************/
/*! exports provided: Role */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return Role; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["Miner"] = "miner";
    Role["Voter"] = "voter";
})(Role || (Role = {}));


/***/ }),

/***/ "./src/app/_shared/services/api.service.ts":
/*!*************************************************!*\
  !*** ./src/app/_shared/services/api.service.ts ***!
  \*************************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global.service */ "./src/app/_shared/services/global.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");







let ApiService = class ApiService {
    constructor(http, gs) {
        this.http = http;
        this.gs = gs;
    }
    getData(path, timedOut = 5000) {
        this.gs.log('[API_GET]', path);
        return this.http.get(path.startsWith('http') ? src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].sniffCors + path : src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].apiUrl + path).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(err => Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(err)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => res), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["timeout"])(timedOut), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(3));
    }
    postData(path, model = {}, multipart = false, timedOut = 60000) {
        this.gs.log('[API_POST]', path);
        const options = {};
        let body = model;
        let timer = timedOut;
        if (multipart) {
            const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().append('Content-Type', 'multipart/form-data');
            Object.assign(options, { headers });
            body = this.prepareFormData(model);
            timer = 90000;
        }
        return this.http.post(path.startsWith('http') ? src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].sniffCors + path : src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].apiUrl + path, body, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(err => Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(err)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => res), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["timeout"])(timer));
    }
    putData(path, model = {}, multipart = false, timedOut = 30000) {
        this.gs.log('[API_PUT]', path);
        const options = {};
        let body = model;
        if (multipart) {
            const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().append('Content-Type', 'multipart/form-data');
            Object.assign(options, { headers });
            body = this.prepareFormData(model);
        }
        return this.http.put(path.startsWith('http') ? src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].sniffCors + path : src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].apiUrl + path, body, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(err => Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(err)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => res), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["timeout"])(timedOut));
    }
    deleteData(path, timedOut = 15000) {
        this.gs.log('[API_DEL]', path);
        return this.http.delete(path.startsWith('http') ? src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].sniffCors + path : src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].apiUrl + path).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(err => Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(err)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => res), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["timeout"])(timedOut));
    }
    prepareFormData(data) {
        const formData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }
        return formData;
    }
};
ApiService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_5__["GlobalService"] }
];
ApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ApiService);



/***/ }),

/***/ "./src/app/_shared/services/auth.service.ts":
/*!**************************************************!*\
  !*** ./src/app/_shared/services/auth.service.ts ***!
  \**************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global.service */ "./src/app/_shared/services/global.service.ts");
/* harmony import */ var _crypto_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./crypto.service */ "./src/app/_shared/services/crypto.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");










let AuthService = class AuthService {
    constructor(http, router, gs, crypt, cs) {
        this.http = http;
        this.router = router;
        this.gs = gs;
        this.crypt = crypt;
        this.cs = cs;
        let token = null;
        let userSession = null;
        try {
            token = localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].tokenName);
            const userEncrypted = localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].sessionName);
            const userDecrypted = this.crypt.decrypt(userEncrypted, token);
            userSession = JSON.parse(userDecrypted);
        }
        catch (e) {
            localStorage.removeItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].sessionName);
        }
        this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](userSession);
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    verify(token) {
        this.gs.log('[AUTH_VERIFY]', token);
        return this.http.post(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].apiUrl}/verify`, { token })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(respVerify => {
            this.currentUserSubject.next(respVerify.result.user);
            const userSession = JSON.stringify(respVerify.result.user);
            const userEncrypted = this.crypt.encrypt(userSession, token);
            localStorage.setItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].sessionName, userEncrypted);
            return respVerify.result.user;
        }));
    }
    login(loginData) {
        this.gs.log('[AUTH_LOGIN]', loginData);
        return this.http.post(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].apiUrl}/login`, loginData);
    }
    logout() {
        this.currentUserSubject.next(null);
        localStorage.removeItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].sessionName);
        localStorage.removeItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].tokenName);
        this.router.navigate(['/login']);
    }
    register(registerData) {
        this.gs.log('[AUTH_REGISTER]', registerData);
        return this.http.post(`${src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].apiUrl}/register`, registerData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(respRegister => {
            localStorage.setItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].tokenName, respRegister.result.token);
        }));
    }
};
AuthService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"] },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_7__["GlobalService"] },
    { type: _crypto_service__WEBPACK_IMPORTED_MODULE_8__["CryptoService"] },
    { type: ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__["CookieService"] }
];
AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' })
], AuthService);



/***/ }),

/***/ "./src/app/_shared/services/busy.service.ts":
/*!**************************************************!*\
  !*** ./src/app/_shared/services/busy.service.ts ***!
  \**************************************************/
/*! exports provided: BusyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusyService", function() { return BusyService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");



let BusyService = class BusyService {
    constructor(spinnerService) {
        this.spinnerService = spinnerService;
        this.busyRequestCount = 0;
    }
    busy() {
        this.busyRequestCount++;
        this.spinnerService.show();
    }
    idle() {
        this.busyRequestCount--;
        if (this.busyRequestCount <= 0) {
            this.busyRequestCount = 0;
            this.spinnerService.hide();
        }
    }
};
BusyService.ctorParameters = () => [
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"] }
];
BusyService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], BusyService);



/***/ }),

/***/ "./src/app/_shared/services/crypto.service.ts":
/*!****************************************************!*\
  !*** ./src/app/_shared/services/crypto.service.ts ***!
  \****************************************************/
/*! exports provided: CryptoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CryptoService", function() { return CryptoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto-js */ "./node_modules/crypto-js/index.js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_2__);



let CryptoService = class CryptoService {
    constructor() {
        this.keySize = 256;
        this.ivSize = 128;
        this.iterations = 100;
    }
    encrypt(msg, pass) {
        const salt = crypto_js__WEBPACK_IMPORTED_MODULE_2__["lib"].WordArray.random(128 / 8);
        const key = crypto_js__WEBPACK_IMPORTED_MODULE_2__["PBKDF2"](pass, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        const iv = crypto_js__WEBPACK_IMPORTED_MODULE_2__["lib"].WordArray.random(128 / 8);
        const encrypted = crypto_js__WEBPACK_IMPORTED_MODULE_2__["AES"].encrypt(msg, key, {
            iv,
            padding: crypto_js__WEBPACK_IMPORTED_MODULE_2__["pad"].Pkcs7,
            mode: crypto_js__WEBPACK_IMPORTED_MODULE_2__["mode"].CBC
        });
        const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
        return transitmessage;
    }
    decrypt(transitmessage, pass) {
        const salt = crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(transitmessage.substr(0, 32));
        const iv = crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Hex.parse(transitmessage.substr(32, 32));
        const encrypted = transitmessage.substring(64);
        const key = crypto_js__WEBPACK_IMPORTED_MODULE_2__["PBKDF2"](pass, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        const decrypted = crypto_js__WEBPACK_IMPORTED_MODULE_2__["AES"].decrypt(encrypted, key, {
            iv,
            padding: crypto_js__WEBPACK_IMPORTED_MODULE_2__["pad"].Pkcs7,
            mode: crypto_js__WEBPACK_IMPORTED_MODULE_2__["mode"].CBC
        }).toString(crypto_js__WEBPACK_IMPORTED_MODULE_2__["enc"].Utf8);
        return decrypted;
    }
};
CryptoService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], CryptoService);



/***/ }),

/***/ "./src/app/_shared/services/global.service.ts":
/*!****************************************************!*\
  !*** ./src/app/_shared/services/global.service.ts ***!
  \****************************************************/
/*! exports provided: GlobalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalService", function() { return GlobalService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let GlobalService = class GlobalService {
    constructor() { }
    log(message, data = null, type = 'log') {
        if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])()) {
            if (type === 'log') {
                if (data) {
                    console.log(message, data);
                }
                else {
                    console.log(message);
                }
            }
            else if (type === 'error') {
                console.error(message, data);
            }
        }
    }
    getDirtyValues(formGroup) {
        const dirtyValues = {};
        Object.keys(formGroup.controls).forEach(control => {
            const currentControl = formGroup.get(control);
            if (currentControl.dirty) {
                dirtyValues[control] = currentControl.value;
            }
        });
        return dirtyValues;
    }
    get randomColor() {
        // tslint:disable-next-line: no-bitwise
        return (Math.random() * 0xFFFFFF << 0).toString(16);
    }
};
GlobalService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], GlobalService);



/***/ }),

/***/ "./src/app/_shared/services/user.service.ts":
/*!**************************************************!*\
  !*** ./src/app/_shared/services/user.service.ts ***!
  \**************************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.service */ "./src/app/_shared/services/api.service.ts");
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global.service */ "./src/app/_shared/services/global.service.ts");




let UserService = class UserService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        this.myCoinBase = {
            wei: 0,
            gwei: 0,
            ether: 0,
            tether: 0
        };
    }
    getAccountBalance(accountAddress) {
        this.api.getData(`/coinbase?accountAddress=${accountAddress}`).subscribe(res => {
            this.gs.log('[COINBASE]', res);
            this.myCoinBase = res.result;
        });
    }
    requestCoin(coinRequestedValue) {
        return this.api.postData('/fund', coinRequestedValue);
    }
    adminAcceptCoinRequest(id) {
        return this.api.postData(`/fund/${id}`);
    }
    getAllUser() {
        return this.api.getData('/user');
    }
    getUserData(userAddress) {
        return this.api.getData(`/user/${userAddress}`);
    }
    cekNik(data) {
        return this.api.postData('/kpu/cek-nik', data);
    }
    cekAccount(data) {
        return this.api.postData('/check-account', data);
    }
    registerAccount(data) {
        return this.api.postData('/register', data);
    }
    newEthAccount(data) {
        return this.api.postData('/new-eth-account', data);
    }
    importEthAccount(data) {
        return this.api.postData('/import-eth-account', data);
    }
    getTransactionHash(transactionHash) {
        return this.api.getData(`/dump/${transactionHash}`);
    }
};
UserService.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"] }
];
UserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], UserService);



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () => Promise.all(/*! import() | _shared-components-login-login-module */[__webpack_require__.e("default~_shared-components-login-login-module~_shared-components-register-register-module~admin-admi~797106d1"), __webpack_require__.e("_shared-components-login-login-module")]).then(__webpack_require__.bind(null, /*! ./_shared/components/login/login.module */ "./src/app/_shared/components/login/login.module.ts")).then(m => m.LoginModule),
        data: {
            title: 'Bifeldy | Login Page',
            description: 'Halaman Login',
            keywords: 'Blockchain E-Voting'
        }
    },
    {
        path: 'register',
        loadChildren: () => Promise.all(/*! import() | _shared-components-register-register-module */[__webpack_require__.e("default~_shared-components-login-login-module~_shared-components-register-register-module~admin-admi~797106d1"), __webpack_require__.e("_shared-components-register-register-module")]).then(__webpack_require__.bind(null, /*! ./_shared/components/register/register.module */ "./src/app/_shared/components/register/register.module.ts")).then(m => m.RegisterModule),
        data: {
            title: 'Bifeldy | Register Page',
            description: 'Halaman Pendaftaran',
            keywords: 'Blockchain E-Voting'
        }
    },
    {
        path: '',
        loadChildren: () => __webpack_require__.e(/*! import() | _pages-pages-module */ "_pages-pages-module").then(__webpack_require__.bind(null, /*! ./_pages/pages.module */ "./src/app/_pages/pages.module.ts")).then(m => m.PagesModule)
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_shared/services/auth.service */ "./src/app/_shared/services/auth.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");







let AppComponent = class AppComponent {
    constructor(router, route, titleService, meta, as) {
        this.router = router;
        this.route = route;
        this.titleService = titleService;
        this.meta = meta;
        this.as = as;
        this.title = 'Client KPU';
        this.description = 'Very Long Description ...';
    }
    ngOnInit() {
        this.router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((event) => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationEnd"]))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(() => this.route))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((route) => {
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route;
        }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((route) => route.outlet === 'primary'))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((route) => route.data))
            .subscribe((event) => {
            this.updateSitePage(event.title, event.description, event.keywords);
        });
        const token = localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].tokenName);
        if (token) {
            this.as.verify(token).subscribe(success => { }, error => this.as.logout());
        }
    }
    updateSitePage(newTitle, newDescription, newKeywords) {
        this.title = newTitle;
        this.titleService.setTitle(`Bifeldy | ${newTitle}`);
        this.meta.updateTag({ name: 'og:title', content: newTitle });
        this.description = newDescription;
        this.meta.updateTag({ name: 'description', content: newDescription });
        this.meta.updateTag({ name: 'og:description', content: newDescription });
        this.meta.updateTag({ name: 'keywords', content: newKeywords });
    }
};
AppComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Meta"] },
    { type: _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_backends_fake_backend__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_shared/backends/fake-backend */ "./src/app/_shared/backends/fake-backend.ts");
/* harmony import */ var _shared_interceptors_http_request_interceptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_shared/interceptors/http-request.interceptor */ "./src/app/_shared/interceptors/http-request.interceptor.ts");
/* harmony import */ var _shared_interceptors_http_error_interceptor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_shared/interceptors/http-error.interceptor */ "./src/app/_shared/interceptors/http-error.interceptor.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.js");
/* harmony import */ var _shared_components_header_header_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_shared/components/header/header.module */ "./src/app/_shared/components/header/header.module.ts");
/* harmony import */ var _shared_components_footer_footer_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_shared/components/footer/footer.module */ "./src/app/_shared/components/footer/footer.module.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");














let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_8__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            _shared_components_header_header_module__WEBPACK_IMPORTED_MODULE_11__["HeaderModule"],
            _shared_components_footer_footer_module__WEBPACK_IMPORTED_MODULE_12__["FooterModule"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_13__["NgxSpinnerModule"]
        ],
        providers: [
            { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _shared_interceptors_http_request_interceptor__WEBPACK_IMPORTED_MODULE_6__["HttpRequestInterceptor"], multi: true },
            { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _shared_interceptors_http_error_interceptor__WEBPACK_IMPORTED_MODULE_7__["HttpErrorInterceptor"], multi: true },
            _shared_backends_fake_backend__WEBPACK_IMPORTED_MODULE_5__["FakeBackendProvider"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"], ngx_cookie_service__WEBPACK_IMPORTED_MODULE_10__["CookieService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_13__["NgxSpinnerService"]
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_ELEMENTS_SCHEMA"]]
    })
], AppModule);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false,
    tokenName: 'bifeldy_token',
    sessionName: 'bifeldy_session',
    apiUrl: '/api',
    sniffCors: 'https://bifeldy-cors.herokuapp.com/'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';
// Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Skripsi\blockchain-evoting\client_kpu\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map