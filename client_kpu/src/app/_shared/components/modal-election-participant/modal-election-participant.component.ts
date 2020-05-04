import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GlobalService } from '../../services/global.service';
import { ElectionService } from '../../services/election.service';

import { Election } from '../../models/election';
import { AuthService } from '../../services/auth.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-modal-election-participant',
  templateUrl: './modal-election-participant.component.html',
  styleUrls: ['./modal-election-participant.component.css']
})
export class ModalElectionParticipantComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, { static: true }) confirmModal: ConfirmModalComponent;
  @ViewChild('modalElectionParticipant', { static: false }) modalElectionParticipant: ModalDirective;

  @Output() refreshParentData = new EventEmitter();

  election: Election = null;
  isModalOpen = false;

  voterParticipantsAccepted = [];
  voterParticipantsPending = [];

  selectedTab = 1;
  selectedPendingAddressArray = [];

  passphrase = null;
  passphraseError = null;

  constructor(
    private gs: GlobalService,
    private es: ElectionService,
    public as: AuthService
  ) { }

  ngOnInit() {
  }

  get isCreator() {
    return this.as.currentUserValue.pubKey === this.election.electionCreator;
  }

  hideModal() {
    this.modalElectionParticipant.hide();
  }

  onHidden() {
    this.isModalOpen = false;
  }

  showModal(e: Election) {
    this.gs.log('[COMPONENT_MODAL-PARTICIPANT]', e);
    this.election = e;
    this.isModalOpen = true;
    this.refreshData();
  }

  selectTab(tabNumber) {
    this.selectedTab = tabNumber;
  }

  refreshData() {
    this.voterParticipantsPending = [];
    this.voterParticipantsAccepted = [];
    this.es.getElectionParticipant(this.election.id).subscribe(
      res => {
        this.gs.log('[ElectionParticipant]', res);
        res.results.forEach(participant => {
          if (participant.joined === 0) {
            this.voterParticipantsPending.push({
              ...participant,
              checked: false
            });
          } else if (participant.joined === 1) {
            this.voterParticipantsAccepted.push(participant);
          }
        });
      }
    );
  }

  checkAllParticipant() {
    this.voterParticipantsPending.forEach(vPP => {
      vPP.checked = !vPP.checked;
    });
    this.updateSelectedPendingAddressArray();
  }

  selectedPending(id) {
    const selectedPendingAddress = this.voterParticipantsPending.find(vPP => vPP.id === id);
    selectedPendingAddress.checked = !selectedPendingAddress.checked;
    this.updateSelectedPendingAddressArray();
  }

  updateSelectedPendingAddressArray() {
    this.selectedPendingAddressArray = [];
    this.voterParticipantsPending.forEach(vPP => {
      if (vPP.checked) {
        this.selectedPendingAddressArray.push(vPP.participantAddress);
      }
    });
  }

  addSelectedParticipant() {
    if (this.passphrase == null || this.passphrase === undefined || this.passphrase === '') {
      this.passphraseError = true;
      return;
    }
    if (this.selectedPendingAddressArray.length <= 0) {
      return;
    }
    this.gs.log('[SelectedPendingAddressArray]', this.selectedPendingAddressArray);
    this.es.addParticipant(this.election.id, {
      participantAddress: this.selectedPendingAddressArray,
      passphrase: window.btoa(this.passphrase)
    }).subscribe(
      res => {
        this.hideModal();
        this.refreshParentData.emit(this.election.id);
        this.confirmModal.showModal({
          callbackData: 'addParticipantFinished',
          title: `Receipt '${this.election.electionName}'`,
          body: JSON.stringify(res.result.trxAddParticipant),
          submit: 'OK'
        }, true);
      },
      err => {
        this.passphrase = null;
        this.hideModal();
        this.refreshParentData.emit(this.election.id);
        this.confirmModal.showModal({
          callbackData: 'addParticipantFailed',
          title: `Receipt '${this.election.electionName}'`,
          body: JSON.stringify(err.error.result.message),
          submit: 'OK'
        });
      }
    );
  }

  confirmModalCallback(callbackData) {
    if (callbackData === 'addParticipantFinished') {
    } else if (callbackData === 'addParticipantFailed') {
    }
  }

}
