import { Component, OnInit, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/_shared/services/auth.service';
import { GlobalService } from 'src/app/_shared/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-election',
  templateUrl: './my-election.component.html',
  styleUrls: ['./my-election.component.css']
})
export class MyElectionComponent implements OnInit {

  createdElectionTable = null;
  joinedElectionTable = null;

  columnSettings = [
    {
      data: 'electionImage',
      render: (data, type, row) => `
        <div style="width: 112px;">
          <img class="img-fluid" style="object-fit: cover" src="${data}" height="64" />
        </div>
      `
    }, {
      data: 'electionName',
      render: (data, type, row) => `
        <div style="width: 192px;">${data}</div>
      `
    }, {
      data: 'electionDescription',
      render: (data, type, row) => `
        <div style="width: 320px;">${data}</div>
      `
    }
  ];

  constructor(
    private el: ElementRef,
    private as: AuthService,
    private gs: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initDataTable();
  }

  initDataTable() {
    this.createdElectionTable = ($('#createdElectionTable') as any).DataTable({
      scrollX: true,
      ajax: {
        url: `${environment.apiUrl}/election/?electionCreator=${this.as.currentUserValue.pubKey}`,
        dataSrc: 'results'
      },
      columns: [
        this.columnSettings[0], this.columnSettings[1], this.columnSettings[2], {
          data: 'createdAt',
          render: (data, type, row) => `
            <div style="width: 256px;">
              ${new Date(data).toUTCString()}
            </div>
          `
        }
      ]
    });
    this.joinedElectionTable = ($('#joinedElectionTable') as any).DataTable({
      scrollX: true,
      ajax: {
        url: `${environment.apiUrl}/election/my-joined-election`,
        dataSrc: 'results',
        beforeSend: request => {
          const userToken = localStorage.getItem(environment.tokenName);
          if (userToken) {
            request.setRequestHeader('Authorization', `Bearer ${userToken}`);
          }
        }
      },
      columns: [
        this.columnSettings[0], this.columnSettings[1], this.columnSettings[2], {
          data: 'joined',
          render: (data, type, row) => `
            <div style="width: 256px;">
              ${parseInt(data, 10) === 1 ? 'Sudah Terdaftar' : 'Menunggu Penerimaan'}
            </div>
          `
        }
      ]
    });
    ($('#joinedElectionTable tbody') as any).on('click', (event) => {
      const electionData = this.joinedElectionTable.row($(event.target).parents('tr')).data();
      this.router.navigateByUrl(`/election/${electionData.id}`);
    });
    ($('#createdElectionTable tbody') as any).on('click', (event) => {
      const electionData = this.createdElectionTable.row($(event.target).parents('tr')).data();
      this.router.navigateByUrl(`/election/${electionData.id}`);
    });
  }

  refreshData() {
    this.createdElectionTable.ajax.reload();
    this.joinedElectionTable.ajax.reload();
  }

}
