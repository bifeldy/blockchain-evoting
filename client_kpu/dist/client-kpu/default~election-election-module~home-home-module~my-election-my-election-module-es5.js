function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~election-election-module~home-home-module~my-election-my-election-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/modal-election-detail/modal-election-detail.component.html":
  /*!*************************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/modal-election-detail/modal-election-detail.component.html ***!
    \*************************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcApp_sharedComponentsModalElectionDetailModalElectionDetailComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div *ngIf=\"isModalOpen\" [config]=\"{ show: true }\" bsModal #modalElectionDetail=\"bs-modal\" (onHidden)=\"onHidden()\"\n  class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"dialog-auto-name\">\n  <div class=\"modal-dialog modal-dialog-centered modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header modal-header\" [ngStyle]=\"{\n        'background-image': 'url(' + election.electionImage + ')',\n        'background-size': 'cover',\n        'background-position': 'center center'\n      }\">\n        <h1> &nbsp; <br /> &nbsp; </h1>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"close\" (click)=\"hideModal()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"container-fluid\">\n          <div class=\"row mb-3\">\n            <h3 class=\"w-100 text-center pointer text-primary\">\n              <a routerLink=\"/election/{{ election.id }}\" class=\"text-decoration-none pointer\">\n                {{ election.electionName }}\n              </a>\n            </h3>\n            <h5 class=\"text-muted w-100 text-center\">\n              {{ election.electionDescription }}\n            </h5>\n          </div>\n          <div class=\"row mb-3\">\n            <div class=\"col my-auto p-0\">\n              <div class=\"mb-3 col-12 text-center\">\n                <ul class=\"list-unstyled row\" style=\"max-height: 25vh; overflow-y: auto;\">\n                  <li class=\"media border-bottom mb-1 p-1 list-group-item-action col-md-6 col-lg-4\" *ngFor=\"let i of candidateListInfo\">\n                    <img class=\"align-self-center mr-3\" src=\"{{ i.image }}\" height=\"64px\" />\n                    <div class=\"media-body text-truncate text-left\">\n                      <div class=\"m-0 pt-2\">\n                        <a routerLink=\"/user/{{ i.pubKey }}\" style=\"cursor: pointer;\">{{ i.name }}</a>\n                      </div>\n                      <small class=\"pb-2\">{{ i.email }}</small>\n                    </div>\n                  </li>\n                </ul>\n              </div>\n              <div class=\"col-12 text-center\" *ngIf=\"!this.as.currentUserValue\">\n                <button type=\"button\" class=\"btn btn-sm btn-outline-danger\" routerLink=\"/login\">\n                  Harap Masuk / Daftar Untuk Ikut Serta\n                </button>\n              </div>\n              <div class=\"col-12 text-center\" *ngIf=\"this.as.currentUserValue\">\n                <div *ngIf=\"this.as.currentUserValue.role == 'voter' && election.electionCreator != this.as.currentUserValue.pubKey\">\n                  <div *ngIf=\"election.electionIsActive == 1\">\n                    <button type=\"button\" *ngIf=\"joined == null\"\n                      class=\"btn btn-sm btn-outline-primary\" (click)=\"confirmjoinElection()\">\n                        Daftar Sebagai Partisipan Pemilih\n                    </button>\n                    <p *ngIf=\"joined == 0\">\n                      Pendaftaran Sebagai Partisipan Telah Dikirimkan Dan Menunggu Konfirmasi Pemilik\n                    </p>\n                  </div>\n                  <button type=\"button\" class=\"btn btn-sm btn-outline-primary\"\n                    *ngIf=\"joined == 1 || election.electionIsActive == 0\" routerLink=\"/election/{{ election.id }}\" >\n                    Menuju Halaman Detail Pemilihan\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-12\">\n          <div class=\"row\">\n            <small class=\"col-6 text-left text-muted mt-auto\">{{ election.electionId }}</small>\n            <small class=\"col-6 text-right text-muted\" *ngIf=\"this.as.currentUserValue\">\n              <a routerLink=\"/my-election\" class=\"text-danger\"\n                *ngIf=\"election.electionCreator == this.as.currentUserValue.pubKey && !router.url.includes('/election/')\">\n                  You're The Owner, Manage This Election\n                  <i class=\"fa fa-fw fa-arrow-right\"></i>\n              </a>\n            </small>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<app-confirm-modal (submitButton)=\"confirmModalCallback($event)\"></app-confirm-modal>";
    /***/
  },

  /***/
  "./src/app/_shared/components/modal-election-detail/modal-election-detail.component.css":
  /*!**********************************************************************************************!*\
    !*** ./src/app/_shared/components/modal-election-detail/modal-election-detail.component.css ***!
    \**********************************************************************************************/

  /*! exports provided: default */

  /***/
  function srcApp_sharedComponentsModalElectionDetailModalElectionDetailComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19zaGFyZWQvY29tcG9uZW50cy9tb2RhbC1lbGVjdGlvbi1kZXRhaWwvbW9kYWwtZWxlY3Rpb24tZGV0YWlsLmNvbXBvbmVudC5jc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/_shared/components/modal-election-detail/modal-election-detail.component.ts":
  /*!*********************************************************************************************!*\
    !*** ./src/app/_shared/components/modal-election-detail/modal-election-detail.component.ts ***!
    \*********************************************************************************************/

  /*! exports provided: ModalElectionDetailComponent */

  /***/
  function srcApp_sharedComponentsModalElectionDetailModalElectionDetailComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ModalElectionDetailComponent", function () {
      return ModalElectionDetailComponent;
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


    var _services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../services/global.service */
    "./src/app/_shared/services/global.service.ts");
    /* harmony import */


    var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../services/auth.service */
    "./src/app/_shared/services/auth.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _services_election_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../services/election.service */
    "./src/app/_shared/services/election.service.ts");
    /* harmony import */


    var _confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../confirm-modal/confirm-modal.component */
    "./src/app/_shared/components/confirm-modal/confirm-modal.component.ts");

    var ModalElectionDetailComponent =
    /*#__PURE__*/
    function () {
      function ModalElectionDetailComponent(router, gs, as, es) {
        _classCallCheck(this, ModalElectionDetailComponent);

        this.router = router;
        this.gs = gs;
        this.as = as;
        this.es = es;
        this.election = null;
        this.isModalOpen = false;
        this.currentUser = null;
        this.candidateListInfo = [];
        this.joined = null;
      }

      _createClass(ModalElectionDetailComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          this.as.currentUser.subscribe(function (user) {
            _this.currentUser = user;
          });
        }
      }, {
        key: "hideModal",
        value: function hideModal() {
          this.modalElectionDetail.hide();
        }
      }, {
        key: "onHidden",
        value: function onHidden() {
          this.isModalOpen = false;
        }
      }, {
        key: "showModal",
        value: function showModal(e) {
          var _this2 = this;

          this.gs.log('[COMPONENT_MODAL-ELECTION]', e);
          this.election = e;
          this.isModalOpen = true;
          this.findElectionInJoined();
          this.es.getElectionCandidate(e.id).subscribe(function (res) {
            _this2.gs.log('[ElectionCandidate]', res);

            _this2.candidateListInfo = res.result.candidatesInfo;
          });
        }
      }, {
        key: "findElectionInJoined",
        value: function findElectionInJoined() {
          var _this3 = this;

          if (this.currentUser) {
            this.es.loadMyJoinedElection().subscribe(function (res) {
              _this3.gs.log('[MyJoinedElection]', res);

              var myJoinedElection = res.results;
              var joinedElection = myJoinedElection.find(function (mJE) {
                return mJE.id === _this3.election.id;
              });

              if (joinedElection) {
                _this3.joined = joinedElection.joined;
              }
            });
          }
        }
      }, {
        key: "confirmjoinElection",
        value: function confirmjoinElection() {
          this.confirmModal.showModal({
            callbackData: 'joinElectionConfirmation',
            title: "Gabung '".concat(this.election.electionName, "'"),
            body: 'Apakah Yakin Ingin Bergabung Sebagai Partisipan?',
            submit: 'Ya'
          });
        }
      }, {
        key: "joinElection",
        value: function joinElection() {
          var _this4 = this;

          this.es.joinElection(this.election.id).subscribe(function (res) {
            _this4.openModalMessage(res);
          }, function (err) {
            _this4.openModalMessage(err.error);
          });
        }
      }, {
        key: "openModalMessage",
        value: function openModalMessage(res) {
          this.gs.log('[JoinElection]', res);
          this.hideModal();
          this.confirmModal.showModal({
            callbackData: 'joinElectionFinished',
            title: "Gabung '".concat(this.election.electionName, "'"),
            body: JSON.stringify(res.result.message),
            submit: 'OK'
          });
        }
      }, {
        key: "confirmModalCallback",
        value: function confirmModalCallback(callbackData) {
          if (callbackData === 'joinElectionConfirmation') {
            this.joinElection();
          } else if (callbackData === 'joinElectionFinished') {
            this.router.navigateByUrl("/election/".concat(this.election.id));
          }
        }
      }]);

      return ModalElectionDetailComponent;
    }();

    ModalElectionDetailComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: _services_global_service__WEBPACK_IMPORTED_MODULE_2__["GlobalService"]
      }, {
        type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
      }, {
        type: _services_election_service__WEBPACK_IMPORTED_MODULE_5__["ElectionService"]
      }];
    };

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('modalElectionDetail', {
      static: false
    })], ModalElectionDetailComponent.prototype, "modalElectionDetail", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_6__["ConfirmModalComponent"], {
      static: true
    })], ModalElectionDetailComponent.prototype, "confirmModal", void 0);
    ModalElectionDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-modal-election-detail',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./modal-election-detail.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/_shared/components/modal-election-detail/modal-election-detail.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./modal-election-detail.component.css */
      "./src/app/_shared/components/modal-election-detail/modal-election-detail.component.css")).default]
    })], ModalElectionDetailComponent);
    /***/
  },

  /***/
  "./src/app/_shared/components/modal-election-detail/modal-election-detail.module.ts":
  /*!******************************************************************************************!*\
    !*** ./src/app/_shared/components/modal-election-detail/modal-election-detail.module.ts ***!
    \******************************************************************************************/

  /*! exports provided: ModalElectionDetailModule */

  /***/
  function srcApp_sharedComponentsModalElectionDetailModalElectionDetailModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ModalElectionDetailModule", function () {
      return ModalElectionDetailModule;
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


    var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ngx-bootstrap */
    "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
    /* harmony import */


    var _modal_election_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./modal-election-detail.component */
    "./src/app/_shared/components/modal-election-detail/modal-election-detail.component.ts");
    /* harmony import */


    var _confirm_modal_confirm_modal_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../confirm-modal/confirm-modal.module */
    "./src/app/_shared/components/confirm-modal/confirm-modal.module.ts");

    var ModalElectionDetailModule = function ModalElectionDetailModule() {
      _classCallCheck(this, ModalElectionDetailModule);
    };

    ModalElectionDetailModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_modal_election_detail_component__WEBPACK_IMPORTED_MODULE_5__["ModalElectionDetailComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ModalModule"].forRoot(), ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ButtonsModule"].forRoot(), _confirm_modal_confirm_modal_module__WEBPACK_IMPORTED_MODULE_6__["ConfirmModalModule"]],
      exports: [_modal_election_detail_component__WEBPACK_IMPORTED_MODULE_5__["ModalElectionDetailComponent"]]
    })], ModalElectionDetailModule);
    /***/
  },

  /***/
  "./src/app/_shared/services/election.service.ts":
  /*!******************************************************!*\
    !*** ./src/app/_shared/services/election.service.ts ***!
    \******************************************************/

  /*! exports provided: ElectionService */

  /***/
  function srcApp_sharedServicesElectionServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ElectionService", function () {
      return ElectionService;
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


    var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./global.service */
    "./src/app/_shared/services/global.service.ts");
    /* harmony import */


    var _api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./api.service */
    "./src/app/_shared/services/api.service.ts");
    /* harmony import */


    var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./auth.service */
    "./src/app/_shared/services/auth.service.ts");

    var ElectionService =
    /*#__PURE__*/
    function () {
      function ElectionService(api, as, gs) {
        _classCallCheck(this, ElectionService);

        this.api = api;
        this.as = as;
        this.gs = gs;
        this.loadElection('active');
        this.loadMyJoinedElection();
      }

      _createClass(ElectionService, [{
        key: "loadElection",
        value: function loadElection() {
          var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
          var row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
          return this.api.getData("/election?status=".concat(status, "&row=").concat(row));
        }
      }, {
        key: "loadMyJoinedElection",
        value: function loadMyJoinedElection() {
          return this.api.getData("/election/my-joined-election");
        }
      }, {
        key: "loadElectionByCreator",
        value: function loadElectionByCreator(electionCreator) {
          var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
          var row = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
          return this.api.getData("/election/?status=".concat(status, "&electionCreator=").concat(electionCreator, "&row=").concat(row));
        }
      }, {
        key: "createNewElection",
        value: function createNewElection(electionData) {
          return this.api.postData("/election/create", electionData);
        }
      }, {
        key: "endElectionPeriode",
        value: function endElectionPeriode(id, data) {
          return this.api.postData("/election/".concat(id, "/end"), data);
        }
      }, {
        key: "getElectionData",
        value: function getElectionData(id) {
          return this.api.getData("/election/".concat(id));
        }
      }, {
        key: "getElectionCandidate",
        value: function getElectionCandidate(id) {
          return this.api.getData("/election/".concat(id, "/candidate"));
        }
      }, {
        key: "getElectionParticipant",
        value: function getElectionParticipant(id) {
          return this.api.getData("/election/".concat(id, "/participant"));
        }
      }, {
        key: "joinElection",
        value: function joinElection(id) {
          return this.api.postData("/election/".concat(id, "/register"));
        }
      }, {
        key: "addParticipant",
        value: function addParticipant(id, data) {
          return this.api.postData("/election/".concat(id, "/participant"), data);
        }
      }, {
        key: "voteCandidate",
        value: function voteCandidate(id, data) {
          return this.api.postData("/election/".concat(id, "/vote"), data);
        }
      }, {
        key: "myVote",
        value: function myVote(id, data) {
          return this.api.postData("/election/".concat(id, "/my-vote"), data);
        }
      }]);

      return ElectionService;
    }();

    ElectionService.ctorParameters = function () {
      return [{
        type: _api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"]
      }, {
        type: _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]
      }, {
        type: _global_service__WEBPACK_IMPORTED_MODULE_2__["GlobalService"]
      }];
    };

    ElectionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], ElectionService);
    /***/
  }
}]);
//# sourceMappingURL=default~election-election-module~home-home-module~my-election-my-election-module-es5.js.map