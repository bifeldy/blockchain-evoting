import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';

import { GlobalService } from '../../services/global.service';

import { Election } from '../../models/election';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-election-detail',
  templateUrl: './modal-election-detail.component.html',
  styleUrls: ['./modal-election-detail.component.css']
})
export class ModalElectionDetailComponent implements OnInit {

  @ViewChild('modalElectionDetail', { static: false }) modalElectionDetail: ModalDirective;

  election: Election = null;
  isModalOpen = false;

  constructor(
    public router: Router,
    private gs: GlobalService,
    public as: AuthService
  ) { }

  ngOnInit() {
  }

  hideModal() {
    this.modalElectionDetail.hide();
  }

  onHidden() {
    this.isModalOpen = false;
  }

  joinElection(eId) {
    console.log(eId);
  }

  showModal(e: Election) {
    console.log(this.as.currentUserValue);
    this.gs.log('[ElectionDetail]', e);
    this.election = e;
    this.isModalOpen = true;
  }

}
