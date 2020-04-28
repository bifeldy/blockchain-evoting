import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { environment } from 'src/environments/environment';

import { GlobalService } from 'src/app/_shared/services/global.service';

import { Election } from 'src/app/_shared/models/election';

import { ModalElectionDetailComponent } from 'src/app/_shared/components/modal-election-detail/modal-election-detail.component';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {

  private table;

  @ViewChild(ModalElectionDetailComponent, { static: true }) modalElectionDetail: ModalElectionDetailComponent;

  constructor(
    private el: ElementRef,
    private gs: GlobalService
  ) { }

  ngOnInit() {
    this.initDataTable();
  }

  initDataTable() {
    this.table = ($(this.el.nativeElement.querySelector('table')) as any).DataTable({
      scrollX: true,
      ajax: {
        url: `${environment.apiUrl}/election`,
        dataSrc: 'results'
      },
      columns: [
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
        }, {
          data: 'createdAt',
          render: (data, type, row) => `
            <div style="width: 256px;">
              ${new Date(data).toUTCString()}
            </div>
          `
        }
      ]
    });
    ($('#electionTable tbody') as any).on('click', (event) => {
      const electionData = this.table.row($(event.target).parents('tr')).data();
      this.modalElectionDetail.showModal(electionData);
    });
  }

  refreshData() {
    this.table.ajax.reload();
  }

}
