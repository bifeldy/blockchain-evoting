import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';

import { GlobalService } from '../../services/global.service';

import { Election } from '../../models/election';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ElectionService } from '../../services/election.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-modal-election-detail',
  templateUrl: './modal-election-detail.component.html',
  styleUrls: ['./modal-election-detail.component.css']
})
export class ModalElectionDetailComponent implements OnInit {

  @ViewChild('modalElectionDetail', { static: false }) modalElectionDetail: ModalDirective;
  @ViewChild(ConfirmModalComponent, { static: true }) confirmModal: ConfirmModalComponent;

  election: Election = null;
  isModalOpen = false;

  candidateListInfo = [];

  joined = null;

  constructor(
    public router: Router,
    private gs: GlobalService,
    public as: AuthService,
    private es: ElectionService
  ) { }

  ngOnInit() {
  }

  hideModal() {
    this.modalElectionDetail.hide();
  }

  onHidden() {
    this.isModalOpen = false;
  }

  showModal(e: Election) {
    this.gs.log('[COMPONENT_MODAL-ELECTION]', e);
    this.election = e;
    this.isModalOpen = true;
    this.findElectionInJoined();
    this.es.getElectionCandidate(e.id).subscribe(
      res => {
        this.gs.log('[ElectionCandidate]', res);
        this.candidateListInfo = res.result.candidatesInfo;
      }
    );
  }

  findElectionInJoined() {
    this.es.loadMyJoinedElection().subscribe(
      res => {
        this.gs.log('[MyJoinedElection]', res);
        const myJoinedElection = res.results;
        const joinedElection = myJoinedElection.find(mJE => mJE.id === this.election.id);
        if (joinedElection) {
          this.joined = joinedElection.joined;
        }
      }
    );
  }

  confirmjoinElection() {
    this.confirmModal.showModal({
      callbackData: 'joinElectionConfirmation',
      title: `Gabung '${this.election.electionName}'`,
      body: 'Apakah Yakin Ingin Bergabung Sebagai Partisipan?',
      submit: 'Ya'
    });
  }

  joinElection() {
    this.es.joinElection(this.election.id).subscribe(
      res => {
        this.openModalMessage(res);
      },
      err => {
        this.openModalMessage(err.error);
      }
    );
  }

  openModalMessage(res) {
    this.gs.log('[JoinElection]', res);
    this.hideModal();
    this.confirmModal.showModal({
      callbackData: 'joinElectionFinished',
      title: `Gabung '${this.election.electionName}'`,
      body: JSON.stringify(res.result.message),
      submit: 'OK'
    });
  }

  confirmModalCallback(callbackData) {
    if (callbackData === 'joinElectionConfirmation') {
      this.joinElection();
    } else if (callbackData === 'joinElectionFinished') {
      this.router.navigateByUrl(`/election/${this.election.id}`);
    }
  }

}
