(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/admin/admin.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/admin/admin.component.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container py-3 bg-default\">\n  <div class=\"row\">\n    <div class=\"col-md-12 bg-default\">\n      <div class=\"row mt-3 mb-3\">\n        <div class=\"col-12 pb-3 sticky-top bg-default\">\n          <h3 class=\"pt-3 pb-2 border-bottom-dotted\">\n            <a class=\"btn btn-outline-warning float-right btn-sm mt-1 text-success\" (click)=\"refreshData();\">\n              <i class=\"fas fa-sync mr-1\"></i>\n              Refresh\n            </a>\n            <b class=\"text-secondary\">Administrative Panel</b>\n          </h3>\n        </div>\n        <div class=\"col-12 bg-default pt-1\">\n          <ul class=\"nav nav-tabs border-warning\" id=\"myTab\" role=\"tablist\">\n            <li class=\"nav-item ml-3\">\n              <a class=\"nav-link active\" id=\"smartContract-tab\" data-toggle=\"tab\" href=\"#smartContract\" role=\"tab\" aria-controls=\"smartContract\" aria-selected=\"true\">\n                Smart Contracts\n              </a>\n            </li>\n            <li class=\"nav-item\">\n              <a class=\"nav-link\" id=\"users-tab\" data-toggle=\"tab\" href=\"#users\" role=\"tab\" aria-controls=\"users\" aria-selected=\"false\">\n                Registered Users\n              </a>\n            </li>\n            <li class=\"nav-item\">\n              <a class=\"nav-link\" id=\"fund-tab\" data-toggle=\"tab\" href=\"#fund\" role=\"tab\" aria-controls=\"fund\" aria-selected=\"false\">\n                Pending Requested Fund\n              </a>\n            </li>\n            <li class=\"nav-item\">\n              <a class=\"nav-link\" id=\"trx-tab\" data-toggle=\"tab\" href=\"#trx\" role=\"tab\" aria-controls=\"trx\" aria-selected=\"false\">\n                Transactions Dump\n              </a>\n            </li>\n          </ul>\n          <div class=\"tab-content\" id=\"myElectionTable\">\n            <div class=\"tab-pane fade show active p-3\" id=\"smartContract\" role=\"tabpanel\" aria-labelledby=\"smartContract-tab\">\n              <table id=\"smartContractTable\" class=\"pt-1 table table-bordered table-hover table-sm w-100\">\n                <thead>\n                  <tr>\n                    <th>Id</th>\n                    <th>Active</th>\n                    <th>Address</th>\n                    <th>CreatedAt</th>\n                  </tr>\n                </thead>\n              </table>\n            </div>\n            <div class=\"tab-pane fade p-3\" id=\"users\" role=\"tabpanel\" aria-labelledby=\"users-tab\">\n              <table id=\"usersTable\" class=\"pt-1 table table-bordered table-hover table-sm w-100\">\n                <thead>\n                  <tr>\n                    <th>NIK</th>\n                    <th>Phone</th>\n                    <th>Email</th>\n                    <th>Role</th>\n                    <th>Name</th>\n                    <th>PubKey</th>\n                  </tr>\n                </thead>\n              </table>\n            </div>\n            <div class=\"tab-pane fade p-3\" id=\"fund\" role=\"tabpanel\" aria-labelledby=\"fund-tab\">\n              <table id=\"fundTable\" class=\"pt-1 table table-bordered table-hover table-sm w-100\">\n                <thead>\n                  <tr>\n                    <th>Amount</th>\n                    <th>AccountAddress</th>\n                    <th>CreatedAt</th>\n                    <th> &nbsp; </th>\n                  </tr>\n                </thead>\n              </table>\n            </div>\n            <div class=\"tab-pane fade p-3\" id=\"trx\" role=\"tabpanel\" aria-labelledby=\"trx-tab\">\n              <table id=\"trxTable\" class=\"pt-1 table table-bordered table-hover table-sm w-100\">\n                <thead>\n                  <tr>\n                    <th class=\"w-100\">blockHash</th>\n                    <th class=\"w-100\">blockNumber</th>\n                    <th class=\"w-100\">contractAddress</th>\n                    <th class=\"w-100\">cumulativeGasUsed</th>\n                    <th class=\"w-100\">from</th>\n                    <th class=\"w-100\">gasUsed</th>\n                    <th class=\"w-100\">logsBloom</th>\n                    <th class=\"w-100\">status</th>\n                    <th class=\"w-100\">to</th>\n                    <th class=\"w-100\">transactionHash</th>\n                    <th class=\"w-100\">transactionIndex</th>\n                  </tr>\n                </thead>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<app-confirm-modal (submitButton)=\"confirmModalCallback($event)\"></app-confirm-modal>");

/***/ }),

/***/ "./src/app/_pages/admin/admin.component.css":
/*!**************************************************!*\
  !*** ./src/app/_pages/admin/admin.component.css ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19wYWdlcy9hZG1pbi9hZG1pbi5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/_pages/admin/admin.component.ts":
/*!*************************************************!*\
  !*** ./src/app/_pages/admin/admin.component.ts ***!
  \*************************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_shared_services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_shared/services/user.service */ "./src/app/_shared/services/user.service.ts");
/* harmony import */ var src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_shared/services/global.service */ "./src/app/_shared/services/global.service.ts");
/* harmony import */ var src_app_shared_components_confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_shared/components/confirm-modal/confirm-modal.component */ "./src/app/_shared/components/confirm-modal/confirm-modal.component.ts");






let AdminComponent = class AdminComponent {
    constructor(el, us, gs) {
        this.el = el;
        this.us = us;
        this.gs = gs;
    }
    ngOnInit() {
        this.initDataTable();
    }
    initDataTable() {
        this.smartContractTable = $('#smartContractTable').DataTable({
            scrollX: true,
            ajax: {
                url: `${src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}/contract`,
                dataSrc: 'results',
                beforeSend: request => {
                    const userToken = localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].tokenName);
                    if (userToken) {
                        request.setRequestHeader('Authorization', `Bearer ${userToken}`);
                    }
                }
            },
            columns: [
                {
                    data: 'id',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'active',
                    render: (data, type, row) => `
            ${data === 1}
          `
                }, {
                    data: 'address',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'createdAt',
                    render: (data, type, row) => `
            ${new Date(data).toUTCString()}
          `
                }
            ]
        });
        this.usersTable = $('#usersTable').DataTable({
            scrollX: true,
            ajax: {
                url: `${src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}/user`,
                dataSrc: 'results',
                beforeSend: request => {
                    const userToken = localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].tokenName);
                    if (userToken) {
                        request.setRequestHeader('Authorization', `Bearer ${userToken}`);
                    }
                }
            },
            columns: [
                {
                    data: 'nik',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'phone',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'email',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'role',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'name',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'pubKey',
                    render: (data, type, row) => `
            ${data}
          `
                }
            ]
        });
        this.fundTable = $('#fundTable').DataTable({
            scrollX: true,
            ajax: {
                url: `${src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}/fund`,
                dataSrc: 'results',
                beforeSend: request => {
                    const userToken = localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].tokenName);
                    if (userToken) {
                        request.setRequestHeader('Authorization', `Bearer ${userToken}`);
                    }
                }
            },
            columns: [
                {
                    data: 'amount',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'accountAddress',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'createdAt',
                    render: (data, type, row) => `
            ${new Date(data).toUTCString()}
          `
                }, {
                    targets: -1,
                    data: null,
                    defaultContent: `
            <button class="btn btn-info btn-sm tombol-terima">
              <i class="fas fa-check"></i>
              Terima & Berikan Coin
            </button>
          `
                }
            ]
        });
        this.trxTable = $('#trxTable').DataTable({
            scrollX: true,
            ajax: {
                url: `${src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}/dump`,
                dataSrc: 'results',
                beforeSend: request => {
                    const userToken = localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].tokenName);
                    if (userToken) {
                        request.setRequestHeader('Authorization', `Bearer ${userToken}`);
                    }
                }
            },
            columns: [
                {
                    data: 'blockHash',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'blockNumber',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'contractAddress',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'cumulativeGasUsed',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'from',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'gasUsed',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'logsBloom',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'status',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'to',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'transactionHash',
                    render: (data, type, row) => `
            ${data}
          `
                }, {
                    data: 'transactionIndex',
                    render: (data, type, row) => `
            ${data}
          `
                }
            ]
        });
        // ($('#smartContractTable tbody') as any).on('click', (event) => {
        //   const contractData = this.smartContractTable.row($(event.target).parents('tr')).data();
        // });
        // ($('#usersTable tbody') as any).on('click', (event) => {
        //   const usersData = this.usersTable.row($(event.target).parents('tr')).data();
        // });
        $('#fundTable tbody').on('click', '.tombol-terima', (event) => {
            const fundData = this.fundTable.row($(event.target).parents('tr')).data();
            this.us.adminAcceptCoinRequest(fundData.id).subscribe(res => {
                this.gs.log('[AcceptCoinRequest]', res);
                this.fundTable.ajax.reload();
                this.confirmModal.showModal({
                    callbackData: 'acceptCoinFinished',
                    title: `Request Coin Accepted`,
                    body: JSON.stringify(res.result.trxFunded),
                    submit: 'OK'
                }, true);
            }, err => {
                this.fundTable.ajax.reload();
                this.confirmModal.showModal({
                    callbackData: 'acceptCoinFailed',
                    title: `Request Coin Failed`,
                    body: JSON.stringify(err.error.result.message),
                    submit: 'OK'
                });
            });
        });
    }
    refreshData() {
        this.smartContractTable.ajax.reload();
        this.usersTable.ajax.reload();
        this.fundTable.ajax.reload();
        this.trxTable.ajax.reload();
    }
    confirmModalCallback(callbackData) {
        if (callbackData === 'acceptCoinFinished') {
        }
        else if (callbackData === 'acceptCoinFailed') {
        }
    }
};
AdminComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: src_app_shared_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"] },
    { type: src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__["GlobalService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(src_app_shared_components_confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_5__["ConfirmModalComponent"], { static: true })
], AdminComponent.prototype, "confirmModal", void 0);
AdminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-admin',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./admin.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/admin/admin.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./admin.component.css */ "./src/app/_pages/admin/admin.component.css")).default]
    })
], AdminComponent);



/***/ }),

/***/ "./src/app/_pages/admin/admin.module.ts":
/*!**********************************************!*\
  !*** ./src/app/_pages/admin/admin.module.ts ***!
  \**********************************************/
/*! exports provided: AdminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin.component */ "./src/app/_pages/admin/admin.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_shared_components_confirm_modal_confirm_modal_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_shared/components/confirm-modal/confirm-modal.module */ "./src/app/_shared/components/confirm-modal/confirm-modal.module.ts");






const routes = [
    {
        path: '',
        component: _admin_component__WEBPACK_IMPORTED_MODULE_3__["AdminComponent"]
    }
];
let AdminModule = class AdminModule {
};
AdminModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_admin_component__WEBPACK_IMPORTED_MODULE_3__["AdminComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            src_app_shared_components_confirm_modal_confirm_modal_module__WEBPACK_IMPORTED_MODULE_5__["ConfirmModalModule"]
        ]
    })
], AdminModule);



/***/ })

}]);
//# sourceMappingURL=admin-admin-module-es2015.js.map