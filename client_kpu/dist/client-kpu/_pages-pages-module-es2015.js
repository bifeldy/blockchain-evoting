(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["_pages-pages-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/pages.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/pages.component.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"m-0\">\r\n  <div id=\"carouselBanner\" class=\"carousel slide\" data-ride=\"carousel\" data-interval=\"2345\"\r\n    *ngIf=\"!router.url.includes('/status') && !router.url.includes('/election/')\">\r\n    <div class=\"carousel-inner\">\r\n      <div class=\"carousel-item\" [ngClass]=\"{ active: idx == 0 }\" *ngFor=\"let i of banner; index as idx\">\r\n        <img class=\"d-block img-fluid w-100\" [src]=\"i.bannerImage\" [ngStyle]=\"{\r\n          height: ((router.url === '/home') ? '256px' : (router.url.includes('/status')) ? '0px' : '118px'),\r\n          transition: '.25s ease-in-out',\r\n          objectFit: 'cover'\r\n        }\" />\r\n      </div>\r\n    </div>\r\n    <a class=\"carousel-control-prev\" href=\"#carouselBanner\" role=\"button\" data-slide=\"prev\" *ngIf=\"router.url === '/home'\">\r\n      <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n      <span class=\"sr-only\">Previous</span>\r\n    </a>\r\n    <a class=\"carousel-control-next\" href=\"#carouselBanner\" role=\"button\" data-slide=\"next\" *ngIf=\"router.url === '/home'\">\r\n      <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n      <span class=\"sr-only\">Next</span>\r\n    </a>\r\n  </div>\r\n  <router-outlet></router-outlet>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/_pages/pages.component.css":
/*!********************************************!*\
  !*** ./src/app/_pages/pages.component.css ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19wYWdlcy9wYWdlcy5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/_pages/pages.component.ts":
/*!*******************************************!*\
  !*** ./src/app/_pages/pages.component.ts ***!
  \*******************************************/
/*! exports provided: PagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesComponent", function() { return PagesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_shared/services/auth.service */ "./src/app/_shared/services/auth.service.ts");
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_shared/services/global.service */ "./src/app/_shared/services/global.service.ts");





let PagesComponent = class PagesComponent {
    constructor(router, gs, as) {
        this.router = router;
        this.gs = gs;
        this.as = as;
        this.banner = [];
        this.banner = [
            { bannerImage: 'https://img.alinea.id/img/content/2020/03/04/67257/mencari-formula-terbaik-pemilu-serentak-drimdKVyAM.jpg' },
            { bannerImage: 'https://www.goodnewsfromindonesia.id/uploads/post/large-pemilu-2-a3c65072330fe3159814fa7a3e5bbc11.jpg' }
        ];
    }
    ngOnInit() {
    }
};
PagesComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__["GlobalService"] },
    { type: _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] }
];
PagesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-pages',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./pages.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/pages.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./pages.component.css */ "./src/app/_pages/pages.component.css")).default]
    })
], PagesComponent);



/***/ }),

/***/ "./src/app/_pages/pages.module.ts":
/*!****************************************!*\
  !*** ./src/app/_pages/pages.module.ts ***!
  \****************************************/
/*! exports provided: PagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesModule", function() { return PagesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _shared_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_shared/guard/auth-guard.service */ "./src/app/_shared/guard/auth-guard.service.ts");
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages.component */ "./src/app/_pages/pages.component.ts");
/* harmony import */ var _shared_models_role__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_shared/models/role */ "./src/app/_shared/models/role.ts");







const routes = [
    {
        path: '',
        component: _pages_component__WEBPACK_IMPORTED_MODULE_5__["PagesComponent"],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'admin',
                loadChildren: () => Promise.all(/*! import() | admin-admin-module */[__webpack_require__.e("default~admin-admin-module~election-election-module~fund-fund-module~home-home-module~my-election-my~396f8003"), __webpack_require__.e("admin-admin-module")]).then(__webpack_require__.bind(null, /*! ./admin/admin.module */ "./src/app/_pages/admin/admin.module.ts")).then(m => m.AdminModule),
                canActivate: [_shared_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__["AuthGuardService"]],
                data: {
                    title: 'Admin Panel',
                    description: 'Halaman Khusus Untuk Administrasi',
                    keywords: 'Blockchain E-Voting',
                    roles: [_shared_models_role__WEBPACK_IMPORTED_MODULE_6__["Role"].Admin]
                }
            },
            {
                path: 'home',
                loadChildren: () => Promise.all(/*! import() | home-home-module */[__webpack_require__.e("default~admin-admin-module~election-election-module~fund-fund-module~home-home-module~my-election-my~396f8003"), __webpack_require__.e("default~election-election-module~home-home-module~my-election-my-election-module"), __webpack_require__.e("home-home-module")]).then(__webpack_require__.bind(null, /*! ./home/home.module */ "./src/app/_pages/home/home.module.ts")).then(m => m.HomeModule),
                data: {
                    title: 'Home Page',
                    description: 'Halaman Overview',
                    keywords: 'Blockchain E-Voting'
                }
            },
            {
                path: 'explorer',
                loadChildren: () => __webpack_require__.e(/*! import() | explorer-explorer-module */ "explorer-explorer-module").then(__webpack_require__.bind(null, /*! ./explorer/explorer.module */ "./src/app/_pages/explorer/explorer.module.ts")).then(m => m.ExplorerModule),
                data: {
                    title: 'Ethereum Blockchain Explorer',
                    description: 'Menjelajah Data Blockchain',
                    keywords: 'Blockchain E-Voting'
                }
            },
            {
                path: 'fund',
                loadChildren: () => Promise.all(/*! import() | fund-fund-module */[__webpack_require__.e("default~admin-admin-module~election-election-module~fund-fund-module~home-home-module~my-election-my~396f8003"), __webpack_require__.e("fund-fund-module")]).then(__webpack_require__.bind(null, /*! ./fund/fund.module */ "./src/app/_pages/fund/fund.module.ts")).then(m => m.FundModule),
                data: {
                    title: 'Ethereum Money Request',
                    description: 'Meminta Sejumlah Koin Untuk Biaya Transaksi',
                    keywords: 'Blockchain E-Voting',
                    roles: [_shared_models_role__WEBPACK_IMPORTED_MODULE_6__["Role"].Admin, _shared_models_role__WEBPACK_IMPORTED_MODULE_6__["Role"].Miner, _shared_models_role__WEBPACK_IMPORTED_MODULE_6__["Role"].Voter]
                }
            },
            {
                path: 'status',
                loadChildren: () => __webpack_require__.e(/*! import() | status-status-module */ "status-status-module").then(__webpack_require__.bind(null, /*! ./status/status.module */ "./src/app/_pages/status/status.module.ts")).then(m => m.StatusModule),
                data: {
                    title: 'Ethereum Network Status',
                    description: 'Detail Jaringan Ethereum',
                    keywords: 'Blockchain E-Voting'
                }
            },
            {
                path: 'election',
                loadChildren: () => Promise.all(/*! import() | election-election-module */[__webpack_require__.e("default~admin-admin-module~election-election-module~fund-fund-module~home-home-module~my-election-my~396f8003"), __webpack_require__.e("default~election-election-module~home-home-module~my-election-my-election-module"), __webpack_require__.e("election-election-module")]).then(__webpack_require__.bind(null, /*! ./election/election.module */ "./src/app/_pages/election/election.module.ts")).then(m => m.ElectionModule),
                data: {
                    title: 'All Election',
                    description: 'Daftar Semua Public Election Aktif',
                    keywords: 'Blockchain E-Voting'
                }
            },
            {
                path: 'library',
                loadChildren: () => Promise.all(/*! import() | my-election-my-election-module */[__webpack_require__.e("default~admin-admin-module~election-election-module~fund-fund-module~home-home-module~my-election-my~396f8003"), __webpack_require__.e("default~election-election-module~home-home-module~my-election-my-election-module"), __webpack_require__.e("my-election-my-election-module")]).then(__webpack_require__.bind(null, /*! ./my-election/my-election.module */ "./src/app/_pages/my-election/my-election.module.ts")).then(m => m.MyElectionModule),
                canActivate: [_shared_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__["AuthGuardService"]],
                data: {
                    title: 'My Election',
                    description: 'Halaman Daftar Pemilu Yang Dibuat Dan Diikuti',
                    keywords: 'Blockchain E-Voting',
                    roles: [_shared_models_role__WEBPACK_IMPORTED_MODULE_6__["Role"].Admin, _shared_models_role__WEBPACK_IMPORTED_MODULE_6__["Role"].Miner, _shared_models_role__WEBPACK_IMPORTED_MODULE_6__["Role"].Voter]
                }
            },
            {
                path: '**',
                redirectTo: 'home'
                // loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
            }
        ]
    }
];
let PagesModule = class PagesModule {
};
PagesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_pages_component__WEBPACK_IMPORTED_MODULE_5__["PagesComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
        ]
    })
], PagesModule);



/***/ }),

/***/ "./src/app/_shared/guard/auth-guard.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/_shared/guard/auth-guard.service.ts ***!
  \*****************************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/_shared/services/auth.service.ts");




let AuthGuardService = class AuthGuardService {
    constructor(router, as) {
        this.router = router;
        this.as = as;
    }
    canActivate(route, state) {
        const currentUser = this.as.currentUserValue;
        if (currentUser) {
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                this.router.navigate(['/']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
};
AuthGuardService.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] }
];
AuthGuardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], AuthGuardService);



/***/ })

}]);
//# sourceMappingURL=_pages-pages-module-es2015.js.map