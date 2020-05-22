import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { UserService } from 'src/app/_shared/services/user.service';
import { GlobalService } from 'src/app/_shared/services/global.service';
import { ConfirmModalComponent } from 'src/app/_shared/components/confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';
import { ChainService } from 'src/app/_shared/services/chain.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, { static: true }) confirmModal: ConfirmModalComponent;

  private smartContractTable;
  private usersTable;
  private signerTable;
  private fundTable;
  private trxTable;

  signers = null;

  constructor(
    private router: Router,
    private el: ElementRef,
    private us: UserService,
    private gs: GlobalService,
    private cs: ChainService
  ) { }

  ngOnInit() {
    this.initDataTable();
    this.getSigners();
  }

  initDataTable() {
    this.smartContractTable = ($('#smartContractTable') as any).DataTable({
      scrollX: true,
      ajax: {
        url: `${environment.apiUrl}/contract`,
        dataSrc: 'results',
        beforeSend: request => {
          const userToken = localStorage.getItem(environment.tokenName);
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
    this.usersTable = ($('#usersTable') as any).DataTable({
      scrollX: true,
      ajax: {
        url: `${environment.apiUrl}/user`,
        dataSrc: 'results',
        beforeSend: request => {
          const userToken = localStorage.getItem(environment.tokenName);
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
    this.fundTable = ($('#fundTable') as any).DataTable({
      scrollX: true,
      ajax: {
        url: `${environment.apiUrl}/fund`,
        dataSrc: 'results',
        beforeSend: request => {
          const userToken = localStorage.getItem(environment.tokenName);
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
    this.trxTable = ($('#trxTable') as any).DataTable({
      scrollX: true,
      ajax: {
        url: `${environment.apiUrl}/dump`,
        dataSrc: 'results',
        beforeSend: request => {
          const userToken = localStorage.getItem(environment.tokenName);
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
    ($('#trxTable tbody') as any).on('click', (event) => {
      const trxData = this.trxTable.row($(event.target).parents('tr')).data();
      this.router.navigateByUrl(`/explorer/transaction/${trxData.transactionHash}`);
    });
    ($('#fundTable tbody') as any).on('click', '.tombol-terima', (event) => {
      const fundData = this.fundTable.row($(event.target).parents('tr')).data();
      this.us.adminAcceptCoinRequest(fundData.id).subscribe(
        res => {
          this.gs.log('[AcceptCoinRequest]', res);
          this.fundTable.ajax.reload();
          this.confirmModal.showModal({
            callbackData: 'acceptCoinFinished',
            title: `Request Coin Accepted`,
            body: JSON.stringify(res.result.trxFunded),
            submit: 'OK'
          }, true);
        },
        err => {
          this.fundTable.ajax.reload();
          this.confirmModal.showModal({
            callbackData: 'acceptCoinFailed',
            title: `Request Coin Failed`,
            body: JSON.stringify(err.error.result.message),
            submit: 'OK'
          });
        }
      );
    });
  }

  refreshData() {
    this.smartContractTable.ajax.reload();
    this.usersTable.ajax.reload();
    this.fundTable.ajax.reload();
    this.trxTable.ajax.reload();
    this.getSigners();
  }

  confirmModalCallback(callbackData) {
    if (callbackData === 'acceptCoinFinished') {
    } else if (callbackData === 'acceptCoinFailed') {
    }
  }

  getSigners() {
    this.cs.getSigners().subscribe(
      res2 => {
        this.signers = res2.results;
        this.signerTable = ($('#signerTable') as any).DataTable();
      }
    );
  }

}
