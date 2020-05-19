(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/home/home.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/home/home.component.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container py-3 bg-default\">\n  <div class=\"row\">\n    <div class=\"col-md-8 bg-default\">\n      <div class=\"row mt-3 mb-3\">\n        <div class=\"col-12 pb-3 sticky-top bg-default\">\n          <h3 class=\"pt-3 pb-2 border-bottom-dotted\">\n            <small>\n              <a class=\"float-right text-sm text-success mt-2 text-decoration-none\" routerLink=\"/election\">\n                <small>Lihat Semua</small>\n              </a>\n            </small>\n            <b class=\"text-secondary\">Latest Active Election</b>\n          </h3>\n        </div>\n        <div class=\"col-12 bg-default\">\n          <ul class=\"list-unstyled\">\n            <li class=\"media border-bottom mb-1 p-1 list-group-item-action\" *ngFor=\"let i of electionList | slice: 0:5\">\n              <img class=\"align-self-center mr-3\" src=\"{{ i.electionImage }}\" (click)=\"openElectionModal(i)\" style=\"cursor: pointer; max-width: 128px;\" />\n              <div class=\"media-body text-truncate\">\n                <h5 class=\"m-0 pt-2\">\n                  <a (click)=\"openElection(i)\" style=\"cursor: pointer;\">{{ i.electionName }}</a>\n                </h5>\n                <p class=\"m-0 text-muted\">{{ i.electionCreator }}</p>\n                <div class=\"pb-2\">\n                  {{ i.electionDescription }}\n                </div>\n              </div>\n            </li>\n          </ul>\n        </div>\n      </div>\n      <div class=\"row mt-3 mb-3\">\n        <div class=\"col-12 pb-3 sticky-top bg-default\">\n          <h3 class=\"pt-3 pb-2 border-bottom-dotted\">\n            <b class=\"text-secondary\">Section 1</b>\n          </h3>\n        </div>\n        <div class=\"col-12 bg-default\">\n          <div class=\"row text-center px-3 text-lg-left\">\n            <div class=\"col-md-4 col-6 p-2\" *ngFor=\"let i of randomColor | slice: 0:6\">\n              <a href=\"#\" class=\"d-block h-100\">\n                <img class=\"img-fluid\" src=\"http://via.placeholder.com/256x192/{{ i }}\" />\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-4 bg-default\">\n      <div class=\"row mt-3 mb-3\">\n        <div class=\"col-12 pb-3 sticky-top bg-default\">\n          <h3 class=\"pt-3 pb-2 border-bottom-dotted\">\n            <b class=\"text-secondary\">Section 2</b>\n          </h3>\n        </div>\n        <div class=\"col-12 bg-default\">\n          <img class=\"img-fluid\" src=\"https://img.alinea.id/img/content/2019/05/21/37331/dugaan-kecurangan-berkaca-pada-pemilu-masa-orde-baru-XhbBxjZ3kP.jpg\" />\n        </div>\n      </div>\n      <div class=\"row mt-3 mb-3\">\n        <div class=\"col-12 pb-3 sticky-top bg-default\">\n          <h3 class=\"pt-3 pb-2 border-bottom-dotted\">\n            <small>\n              <a class=\"float-right text-sm text-success mt-2 text-decoration-none\" routerLink=\"/more\">\n                <small>Lihat Semua</small>\n              </a>\n            </small>\n            <b class=\"text-secondary\">Section 3</b>\n          </h3>\n        </div>\n        <div class=\"col-12 bg-default\">\n          <ul class=\"list-unstyled\">\n            <div class=\"media border-bottom mb-1 p-1 list-group-item-action\" *ngFor=\"let i of randomColor | slice: 0:5\">\n              <img class=\"align-self-center mr-3\" src=\"http://via.placeholder.com/80x80/{{ i }}\" />\n              <div class=\"media-body text-truncate\">\n                <h5 class=\"m-0 pt-2 pb-1\">\n                  <b>Title {{ i }}</b>\n                </h5>\n                <p class=\"m-0 pb-2 text-muted\">Description {{ i }}</p>\n              </div>\n            </div>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<app-modal-election-detail></app-modal-election-detail>\n");

/***/ }),

/***/ "./src/app/_pages/home/home.component.css":
/*!************************************************!*\
  !*** ./src/app/_pages/home/home.component.css ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19wYWdlcy9ob21lL2hvbWUuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/_pages/home/home.component.ts":
/*!***********************************************!*\
  !*** ./src/app/_pages/home/home.component.ts ***!
  \***********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_shared_services_election_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_shared/services/election.service */ "./src/app/_shared/services/election.service.ts");
/* harmony import */ var src_app_shared_components_modal_election_detail_modal_election_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_shared/components/modal-election-detail/modal-election-detail.component */ "./src/app/_shared/components/modal-election-detail/modal-election-detail.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_shared/services/global.service */ "./src/app/_shared/services/global.service.ts");






let HomeComponent = class HomeComponent {
    constructor(gs, es, router) {
        this.gs = gs;
        this.es = es;
        this.router = router;
        this.randomColor = [];
        this.electionList = [];
        for (let i = 0; i < 10; i++) {
            this.randomColor.push(this.gs.randomColor);
        }
    }
    ngOnInit() {
        this.es.loadElection('active').subscribe(res => {
            this.gs.log('[ElectionList]', res);
            this.electionList = res.results;
        });
    }
    openElection(electionData) {
        this.router.navigateByUrl(`/election/${electionData.id}`);
    }
    openElectionModal(electionData) {
        this.modalElectionDetail.showModal(electionData);
    }
};
HomeComponent.ctorParameters = () => [
    { type: src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_5__["GlobalService"] },
    { type: src_app_shared_services_election_service__WEBPACK_IMPORTED_MODULE_2__["ElectionService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(src_app_shared_components_modal_election_detail_modal_election_detail_component__WEBPACK_IMPORTED_MODULE_3__["ModalElectionDetailComponent"], { static: true })
], HomeComponent.prototype, "modalElectionDetail", void 0);
HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/home/home.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.component.css */ "./src/app/_pages/home/home.component.css")).default]
    })
], HomeComponent);



/***/ }),

/***/ "./src/app/_pages/home/home.module.ts":
/*!********************************************!*\
  !*** ./src/app/_pages/home/home.module.ts ***!
  \********************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home.component */ "./src/app/_pages/home/home.component.ts");
/* harmony import */ var src_app_shared_components_modal_election_detail_modal_election_detail_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_shared/components/modal-election-detail/modal-election-detail.module */ "./src/app/_shared/components/modal-election-detail/modal-election-detail.module.ts");






const routes = [
    {
        path: '',
        component: _home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"]
    }
];
let HomeModule = class HomeModule {
};
HomeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            src_app_shared_components_modal_election_detail_modal_election_detail_module__WEBPACK_IMPORTED_MODULE_5__["ModalElectionDetailModule"]
        ]
    })
], HomeModule);



/***/ })

}]);
//# sourceMappingURL=home-home-module-es2015.js.map