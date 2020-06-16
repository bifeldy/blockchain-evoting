(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["explorer-explorer-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/explorer/block-detail/block-detail.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/explorer/block-detail/block-detail.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container py-3 bg-default\" *ngIf=\"block\">\n  <div class=\"row\">\n    <div class=\"col-md-12 bg-default\">\n      <div class=\"row mt-3 mb-3\">\n        <div class=\"col-12 pb-3 sticky-top bg-default\">\n          <h3 class=\"pt-3 pb-2 border-bottom-dotted\">\n            <b class=\"text-secondary\">\n              Block Detail\n            </b>\n          </h3>\n        </div>\n        <div class=\"col-12 bg-default pt-1\">\n          <p style=\"word-wrap: break-word;\">difficulty :: {{ block.difficulty }}</p>\n          <p style=\"word-wrap: break-word;\">extraData :: {{ block.extraData }}</p>\n          <p style=\"word-wrap: break-word;\">gasLimit :: {{ block.gasLimit }} Wei</p>\n          <p style=\"word-wrap: break-word;\">gasUsed :: {{ block.gasUsed }} Wei</p>\n          <p style=\"word-wrap: break-word;\">\n            hash :: \n            <a routerLink=\"/explorer/block/{{ block.hash }}\" class=\"text-success text-decoration-none\">\n              {{ block.hash }}\n            </a>\n          </p>\n          <p style=\"word-wrap: break-word;\">logsBloom :: {{ block.logsBloom }}</p>\n          <p style=\"word-wrap: break-word;\">miner :: {{ block.miner }}</p>\n          <p style=\"word-wrap: break-word;\">mixHash :: {{ block.mixHash }}</p>\n          <p style=\"word-wrap: break-word;\">nonce :: {{ block.nonce }}</p>\n          <p style=\"word-wrap: break-word;\">\n            number ::\n            <a routerLink=\"/explorer/block/{{ block.number }}\" class=\"text-success text-decoration-none\">\n              {{ block.number }}\n            </a>\n          </p>\n          <p style=\"word-wrap: break-word;\">parentHash :: {{ block.parentHash }}</p>\n          <p style=\"word-wrap: break-word;\">receiptsRoot :: {{ block.receiptsRoot }}</p>\n          <p style=\"word-wrap: break-word;\">sha3Uncles :: {{ block.sha3Uncles }}</p>\n          <p style=\"word-wrap: break-word;\">size :: {{ block.size }} Bytes</p>\n          <p style=\"word-wrap: break-word;\">stateRoot :: {{ block.stateRoot }}</p>\n          <p style=\"word-wrap: break-word;\">timestamp :: {{ block.timestamp }}</p>\n          <p style=\"word-wrap: break-word;\">totalDifficulty :: {{ block.totalDifficulty }}</p>\n          <div style=\"word-wrap: break-word;\">\n            transactions :: {{ block.transactions.length }}\n            <ol start=\"0\">\n              <li *ngFor=\"let trx of block.transactions\">\n                <a routerLink=\"/explorer/transaction/{{ trx }}\" class=\"text-success text-decoration-none\">\n                  {{ trx }}\n                </a>\n              </li>\n            </ol>\n          </div>\n          <p style=\"word-wrap: break-word;\">transactionsRoot :: {{ block.transactionsRoot }}</p>\n          <div style=\"word-wrap: break-word;\" *ngIf=\"signers\">\n            signers ::  {{ signers.length }}\n            <ul>\n              <li *ngFor=\"let addrs of signers\">\n                <a routerLink=\"/user/{{ addrs }}\" class=\"text-success text-decoration-none\">\n                  {{ addrs }}\n                </a>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/explorer/explorer.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/explorer/explorer.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container py-3 bg-default\">\n  <div class=\"row\">\n    <div class=\"col-12 pb-3 sticky-top bg-default\">\n      <h3 class=\"pt-3 pb-2 border-bottom-dotted\">\n        <small>\n          <span class=\"float-right text-success mt-2 text-decoration-none\">\n            <nav aria-label=\"Page navigation example\">\n              <ul class=\"pagination pagination-sm\" style=\"margin-bottom: 0;\">\n                <li class=\"page-item\" style=\"cursor: pointer;\">\n                  <a class=\"page-link\" (click)=\"prevPage()\" aria-label=\"Previous\">\n                    <b>\n                      <span aria-hidden=\"true\">&laquo;</span>\n                      <span class=\"sr-only\">Previous</span>\n                    </b>\n                  </a>\n                </li>\n                <li class=\"page-item disabled\">\n                  <a class=\"page-link\">\n                    <b>{{ page }}</b>\n                  </a>\n                </li>\n                <li class=\"page-item\" style=\"cursor: pointer;\">\n                  <a class=\"page-link\" (click)=\"nextPage()\" aria-label=\"Next\">\n                    <b>\n                      <span aria-hidden=\"true\">&raquo;</span>\n                      <span class=\"sr-only\">Next</span>\n                    </b>\n                  </a>\n                </li>\n              </ul>\n            </nav>\n          </span>\n        </small>\n        <b class=\"text-secondary\">Latest Blocks</b>\n      </h3>\n    </div>\n    <div class=\"col-12 bg-default\">\n      <ul class=\"list-unstyled row p-3\">\n        <div class=\"media border-bottom mb-1 p-1 list-group-item-action col-md-6\" style=\"cursor: pointer;\" \n          *ngFor=\"let i of latestBlocks\" routerLink=\"/explorer/block/{{ i.hash }}\">\n          <img class=\"align-self-center mr-3\" src=\"http://via.placeholder.com/80x80/?text={{ i.number }}\" />\n          <div class=\"media-body text-truncate\">\n            <p class=\"m-0 pt-2 text-muted\">\n              <b>{{ i.hash }}</b>\n            </p>\n            <p class=\"m-0 pb-2 text-muted\">\n              #<a class=\"text-primary\">{{ i.number }}</a> |\n              <a class=\"text-danger\">{{ i.transactions.length }}</a> Trxs |\n              <a class=\"text-info\">{{ i.gasUsed }}</a> Wei Gas |\n              <a class=\"text-dark\">{{ i.size }}</a> Bytes\n            </p>\n          </div>\n        </div>\n      </ul>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/explorer/transaction-detail/transaction-detail.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/explorer/transaction-detail/transaction-detail.component.html ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container py-3 bg-default\" *ngIf=\"transactions\">\n  <div class=\"row\">\n    <div class=\"col-md-12 bg-default\">\n      <div class=\"row mt-3 mb-3\">\n        <div class=\"col-12 pb-3 sticky-top bg-default\">\n          <h3 class=\"pt-3 pb-2 border-bottom-dotted\">\n            <b class=\"text-secondary\">\n              Transaction Detail\n            </b>\n          </h3>\n        </div>\n        <div class=\"col-12 bg-default pt-1\">\n          <p style=\"word-wrap: break-word;\">\n            blockHash ::\n            <a routerLink=\"/explorer/block/{{ transactions.blockHash }}\" class=\"text-success text-decoration-none\">\n              {{ transactions.blockHash }}\n            </a>\n          </p>\n          <p style=\"word-wrap: break-word;\">\n            blockNumber ::\n            <a routerLink=\"/explorer/block/{{ transactions.blockNumber }}\" class=\"text-success text-decoration-none\">\n              {{ transactions.blockNumber }}\n            </a>\n          </p>\n          <p style=\"word-wrap: break-word;\">\n            from ::\n            <a routerLink=\"/user/{{ transactions.from }}\" class=\"text-success text-decoration-none\">\n              {{ transactions.from }}\n            </a>\n          </p>\n          <p style=\"word-wrap: break-word;\">gas :: {{ transactions.gas }} Wei</p>\n          <p style=\"word-wrap: break-word;\">gasPrice :: {{ transactions.gasPrice }} Wei</p>\n          <p style=\"word-wrap: break-word;\">\n            hash ::\n            <a routerLink=\"/explorer/transaction/{{ transactions.hash }}\" class=\"text-success text-decoration-none\">\n              {{ transactions.hash }}\n            </a>\n          </p>\n          <p style=\"word-wrap: break-word;\">input :: {{ transactions.input }}</p>\n          <p style=\"word-wrap: break-word;\">nonce :: {{ transactions.nonce }}</p>\n          <p style=\"word-wrap: break-word;\">\n            to ::\n            <a routerLink=\"/user/{{ transactions.to }}\" class=\"text-success text-decoration-none\">\n              {{ transactions.to }}\n            </a>\n          </p>\n          <p style=\"word-wrap: break-word;\">transactionIndex :: {{ transactions.transactionIndex }}</p>\n          <p style=\"word-wrap: break-word;\">value :: {{ transactions.value }}</p>\n          <p style=\"word-wrap: break-word;\">v :: {{ transactions.v }}</p>\n          <p style=\"word-wrap: break-word;\">r :: {{ transactions.r }}</p>\n          <p style=\"word-wrap: break-word;\">s :: {{ transactions.s }}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./src/app/_pages/explorer/block-detail/block-detail.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/_pages/explorer/block-detail/block-detail.component.css ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19wYWdlcy9leHBsb3Jlci9ibG9jay1kZXRhaWwvYmxvY2stZGV0YWlsLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/_pages/explorer/block-detail/block-detail.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/_pages/explorer/block-detail/block-detail.component.ts ***!
  \************************************************************************/
/*! exports provided: BlockDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockDetailComponent", function() { return BlockDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_shared_services_chain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_shared/services/chain.service */ "./src/app/_shared/services/chain.service.ts");
/* harmony import */ var src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_shared/services/global.service */ "./src/app/_shared/services/global.service.ts");





let BlockDetailComponent = class BlockDetailComponent {
    constructor(router, route, gs, cs) {
        this.router = router;
        this.route = route;
        this.gs = gs;
        this.cs = cs;
        this.block = null;
        this.signers = null;
    }
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.cs.getDetailBlock(params.get('blockHash')).subscribe(res1 => {
                this.gs.log('[BLOCK]', res1);
                this.block = res1.result;
                if (!this.block) {
                    this.router.navigateByUrl('/explorer');
                }
                else {
                    this.cs.getBlockSigner(params.get('blockHash')).subscribe(res2 => {
                        this.signers = res2.results;
                    });
                }
            }, err => {
                this.router.navigateByUrl('/explorer');
            });
        });
    }
};
BlockDetailComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__["GlobalService"] },
    { type: src_app_shared_services_chain_service__WEBPACK_IMPORTED_MODULE_3__["ChainService"] }
];
BlockDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-block-detail',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./block-detail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/explorer/block-detail/block-detail.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./block-detail.component.css */ "./src/app/_pages/explorer/block-detail/block-detail.component.css")).default]
    })
], BlockDetailComponent);



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
/* harmony import */ var src_app_shared_services_chain_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_shared/services/chain.service */ "./src/app/_shared/services/chain.service.ts");
/* harmony import */ var src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_shared/services/global.service */ "./src/app/_shared/services/global.service.ts");




let ExplorerComponent = class ExplorerComponent {
    constructor(gs, cs) {
        this.gs = gs;
        this.cs = cs;
        this.latestBlocks = [];
        this.page = 1;
        this.row = 20;
        this.refreshBlockLive = null;
    }
    ngOnInit() {
        this.getLatestBlock(this.page, this.row);
        this.refreshBlockLive = setInterval(() => {
            this.getLatestBlock(this.page, this.row);
        }, 5000);
    }
    ngOnDestroy() {
        clearInterval(this.refreshBlockLive);
    }
    nextPage() {
        this.page += 1;
        this.getLatestBlock(this.page, this.row);
    }
    prevPage() {
        this.page -= 1;
        if (this.page <= 0) {
            this.page = 1;
        }
        this.getLatestBlock(this.page, this.row);
    }
    getLatestBlock(page, row) {
        this.cs.getLatestBlock(page, row).subscribe(res => {
            this.gs.log(`[EXPLORER-BLOCK]`, res);
            this.latestBlocks = res.results.sort((a, b) => (a.number < b.number) ? 1 : -1);
        });
    }
};
ExplorerComponent.ctorParameters = () => [
    { type: src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"] },
    { type: src_app_shared_services_chain_service__WEBPACK_IMPORTED_MODULE_2__["ChainService"] }
];
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
/* harmony import */ var _block_detail_block_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block-detail/block-detail.component */ "./src/app/_pages/explorer/block-detail/block-detail.component.ts");
/* harmony import */ var _transaction_detail_transaction_detail_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transaction-detail/transaction-detail.component */ "./src/app/_pages/explorer/transaction-detail/transaction-detail.component.ts");







const routes = [
    {
        path: 'block/:blockHash',
        component: _block_detail_block_detail_component__WEBPACK_IMPORTED_MODULE_5__["BlockDetailComponent"],
        data: {
            title: 'Block Detail',
            description: 'Halaman Detail Blok',
            keywords: 'Blockchain E-Voting'
        }
    },
    {
        path: 'transaction/:transactionHash',
        component: _transaction_detail_transaction_detail_component__WEBPACK_IMPORTED_MODULE_6__["TransactionDetailComponent"],
        data: {
            title: 'Transaction Detail',
            description: 'Halaman Detail Transaksi',
            keywords: 'Blockchain E-Voting'
        }
    },
    {
        path: '',
        component: _explorer_component__WEBPACK_IMPORTED_MODULE_4__["ExplorerComponent"]
    }
];
let ExplorerModule = class ExplorerModule {
};
ExplorerModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _explorer_component__WEBPACK_IMPORTED_MODULE_4__["ExplorerComponent"],
            _block_detail_block_detail_component__WEBPACK_IMPORTED_MODULE_5__["BlockDetailComponent"],
            _transaction_detail_transaction_detail_component__WEBPACK_IMPORTED_MODULE_6__["TransactionDetailComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
        ]
    })
], ExplorerModule);



/***/ }),

/***/ "./src/app/_pages/explorer/transaction-detail/transaction-detail.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/_pages/explorer/transaction-detail/transaction-detail.component.css ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19wYWdlcy9leHBsb3Jlci90cmFuc2FjdGlvbi1kZXRhaWwvdHJhbnNhY3Rpb24tZGV0YWlsLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/_pages/explorer/transaction-detail/transaction-detail.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/_pages/explorer/transaction-detail/transaction-detail.component.ts ***!
  \************************************************************************************/
/*! exports provided: TransactionDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionDetailComponent", function() { return TransactionDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_shared_services_chain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_shared/services/chain.service */ "./src/app/_shared/services/chain.service.ts");
/* harmony import */ var src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_shared/services/global.service */ "./src/app/_shared/services/global.service.ts");





let TransactionDetailComponent = class TransactionDetailComponent {
    constructor(router, route, gs, cs) {
        this.router = router;
        this.route = route;
        this.gs = gs;
        this.cs = cs;
        this.transactions = null;
    }
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.cs.getDetailTransaction(params.get('transactionHash')).subscribe(res => {
                this.gs.log('[TRANSACTION]', res);
                this.transactions = res.result;
                if (!this.transactions) {
                    this.router.navigateByUrl('/explorer');
                }
            }, err => {
                this.router.navigateByUrl('/explorer');
            });
        });
    }
};
TransactionDetailComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: src_app_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__["GlobalService"] },
    { type: src_app_shared_services_chain_service__WEBPACK_IMPORTED_MODULE_3__["ChainService"] }
];
TransactionDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-transaction-detail',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./transaction-detail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/_pages/explorer/transaction-detail/transaction-detail.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./transaction-detail.component.css */ "./src/app/_pages/explorer/transaction-detail/transaction-detail.component.css")).default]
    })
], TransactionDetailComponent);



/***/ })

}]);
//# sourceMappingURL=explorer-explorer-module-es2015.js.map