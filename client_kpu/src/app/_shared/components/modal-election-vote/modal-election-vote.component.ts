import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Election } from '../../models/election';
import { ElectionService } from '../../services/election.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-modal-election-vote',
  templateUrl: './modal-election-vote.component.html',
  styleUrls: ['./modal-election-vote.component.css']
})
export class ModalElectionVoteComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, { static: true }) confirmModal: ConfirmModalComponent;
  @ViewChild('modalElectionVote', { static: false }) modalElectionVote: ModalDirective;

  @Output() refreshParentData = new EventEmitter();

  electionInfo = null;
  candidateListInfo = [];

  isModalOpen = false;

  selectedCandidate = null;

  passphrase = null;
  passphraseError = null;

  constructor(
    private gs: GlobalService,
    private es: ElectionService
  ) { }

  ngOnInit() {
  }

  hideModal() {
    this.modalElectionVote.hide();
  }

  onHidden() {
    this.isModalOpen = false;
  }

  showModal(election: Election, candidateList) {
    this.gs.log('[COMPONENT_MODAL-VOTE]', election);
    this.gs.log('[COMPONENT_MODAL-VOTE]', candidateList);
    this.electionInfo = election;
    this.candidateListInfo = candidateList;
    this.isModalOpen = true;
  }

  voteCandidate() {
    if (this.passphrase == null || this.passphrase === undefined || this.passphrase === '') {
      this.passphraseError = true;
      return;
    }
    this.gs.log('[SelectedCandidate]', this.selectedCandidate);
    this.es.voteCandidate(this.electionInfo.id, {
      candidateAddress: this.selectedCandidate,
      passphrase: window.btoa(this.passphrase)
    }).subscribe(
      res => {
        this.hideModal();
        this.refreshParentData.emit(this.electionInfo.id);
        this.confirmModal.showModal({
          callbackData: 'voteFinished',
          title: `Receipt '${this.electionInfo.electionName}'`,
          body: JSON.stringify(res.result.trxVote),
          submit: 'OK'
        }, true);
      },
      err => {
        this.passphrase = null;
        this.hideModal();
        this.refreshParentData.emit(this.electionInfo.id);
        this.confirmModal.showModal({
          callbackData: 'voteFailed',
          title: `Receipt '${this.electionInfo.electionName}'`,
          body: JSON.stringify(err.error.result.message),
          submit: 'OK'
        });
      }
    );
  }

  confirmModalCallback(callbackData) {
    if (callbackData === 'voteFinished') {
    } else if (callbackData === 'voteFailed') {
    }
  }

}
