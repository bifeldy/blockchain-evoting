import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/_shared/services/auth.service';

import { Role } from '../../../_shared/models/role';
import { GlobalService } from 'src/app/_shared/services/global.service';
import { ConfirmModalComponent } from 'src/app/_shared/components/confirm-modal/confirm-modal.component';

import { ElectionService } from 'src/app/_shared/services/election.service';
import { UserService } from 'src/app/_shared/services/user.service';
import { Election } from 'src/app/_shared/models/election';
import {
  ModalElectionParticipantComponent
} from 'src/app/_shared/components/modal-election-participant/modal-election-participant.component';
import { ModalElectionVoteComponent } from 'src/app/_shared/components/modal-election-vote/modal-election-vote.component';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import User from 'src/app/_shared/models/user';

@Component({
  selector: 'app-election-detail',
  templateUrl: './election-detail.component.html',
  styleUrls: ['./election-detail.component.css']
})
export class ElectionDetailComponent implements OnInit {

  @ViewChild(ConfirmModalComponent, { static: true }) confirmModal: ConfirmModalComponent;
  @ViewChild(ModalElectionParticipantComponent, { static: true }) modalElectionParticipantComponent: ModalElectionParticipantComponent;
  @ViewChild(ModalElectionVoteComponent, { static: true }) modalElectionVoteComponent: ModalElectionVoteComponent;

  electionData: Election = null;
  currentUser: User = null;

  joined = null;
  participant = false;
  voted = false;

  voterParticipantsAccepted = [];
  voterParticipantsPending = [];

  candidateListInfo = [];
  candidateListVoteCount = [];

  creator = null;

  passphrase = null;
  passphraseError = null;

  accountUnlocked = false;
  voteHistoryData = null;

  trxVote = null;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public gs: GlobalService,
    public as: AuthService,
    private es: ElectionService,
    private us: UserService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.as.currentUser.subscribe(user => {
      this.currentUser = user;
      this.route.params.subscribe(params => {
        this.getElectionData(params.electionId);
      });
    });
  }

  get isVoter() {
    return this.currentUser && this.currentUser.role === Role.Voter;
  }

  getElectionData(id) {
    this.es.getElectionData(id).subscribe(
      res1 => {
        if (res1.result) {
          this.gs.log('[ElectionDetail]', res1);
          this.electionData = res1.result;
          this.findElectionInJoined();
          this.es.getElectionCandidate(id).subscribe(
            res2 => {
              this.gs.log('[ElectionCandidate]', res2);
              this.pieChartLabels = [];
              this.pieChartData = [];
              this.candidateListInfo = res2.result.candidatesInfo;
              this.candidateListVoteCount = res2.result.trxVoteResults;
              this.candidateListInfo.forEach(cLI => {
                const candidate = this.candidateListVoteCount.find(cLV => cLV.candidateAddress.toLowerCase() === cLI.pubKey.toLowerCase());
                if (candidate) {
                  this.pieChartLabels.push(cLI.email);
                  this.pieChartData.push(parseInt(candidate.candidateVoteCount, 10));
                }
              });
              this.gs.log('[pieChartLabels]', this.pieChartLabels);
              this.gs.log('[pieChartData]', this.pieChartData);
            }
          );
          this.es.getElectionParticipant(id).subscribe(
            res3 => {
              this.gs.log('[ElectionParticipant]', res3);
              this.voterParticipantsAccepted = [];
              this.voterParticipantsPending = [];
              res3.results.forEach(participant => {
                if (participant.joined === 0) {
                  this.voterParticipantsPending.push(participant);
                } else if (participant.joined === 1) {
                  this.voterParticipantsAccepted.push(participant);
                }
              });
            }
          );
          this.us.getUserData(this.electionData.electionCreator).subscribe(
            res4 => {
              this.gs.log('[ElectionCreator]', res4);
              this.creator = res4.result;
            }
          );
        } else {
          return this.router.navigateByUrl('/election');
        }
      }
    );
  }

  loginFromElection() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
  }

  findElectionInJoined() {
    if (this.currentUser) {
      this.es.loadMyJoinedElection().subscribe(
        res => {
          this.gs.log('[MyJoinedElection]', res);
          const myJoinedElection = res.results;
          const joinedElection = myJoinedElection.find(mJE => mJE.id === this.electionData.id);
          if (joinedElection) {
            this.joined = joinedElection.joined;
            if (this.joined === 1) {
              this.participant = true;
            }
          }
        }
      );
    }
  }

  confirmjoinElection() {
    this.confirmModal.showModal({
      callbackData: 'joinElectionConfirmation',
      title: `Gabung '${this.electionData.electionName}'`,
      body: 'Apakah Yakin Ingin Bergabung Sebagai Partisipan?',
      submit: 'Ya'
    });
  }

  joinElection() {
    this.es.joinElection(this.electionData.id).subscribe(
      res => {
        this.openModalJoinMessage(res);
      },
      err => {
        this.openModalJoinMessage(err.error);
      }
    );
  }

  openModalJoinMessage(res) {
    this.gs.log('[JoinElection]', res);
    this.getElectionData(this.electionData.id);
    this.confirmModal.showModal({
      callbackData: 'joinElectionFinished',
      title: `Gabung '${this.electionData.electionName}'`,
      body: JSON.stringify(res.result.message),
      submit: 'OK'
    });
  }

  confirmDeactivateElection() {
    if (this.passphrase == null || this.passphrase === undefined || this.passphrase === '') {
      this.passphraseError = true;
      return;
    }
    this.passphraseError = null;
    this.confirmModal.showModal({
      callbackData: 'deactivateElectionConfirmation',
      title: `Nonaktifkan '${this.electionData.electionName}'`,
      body: 'Apakah Yakin Ingin Menonaktifkan Election Ini?',
      submit: 'Ya'
    });
  }

  deactivateElection() {
    this.es.endElectionPeriode(this.electionData.id, {
      passphrase: window.btoa(this.passphrase)
    }).subscribe(
      res => {
        this.gs.log('[ElectionEnd]', res);
        this.passphrase = null;
        this.getElectionData(this.electionData.id);
        this.confirmModal.showModal({
          callbackData: 'deactivateElectionFinished',
          title: `Receipt '${this.electionData.electionName}'`,
          body: JSON.stringify(res.result.trxEndElection),
          submit: 'OK'
        }, true);
      },
      err => {
        this.passphrase = null;
        this.getElectionData(this.electionData.id);
        this.confirmModal.showModal({
          callbackData: 'deactivateElectionFailed',
          title: `Receipt '${this.electionData.electionName}'`,
          body: JSON.stringify(err.error.result.message),
          submit: 'OK'
        });
      }
    );
  }

  confirmModalCallback(callbackData) {
    if (callbackData === 'joinElectionConfirmation') {
      this.joinElection();
    } else if (callbackData === 'joinElectionFinished') {
    } else if (callbackData === 'deactivateElectionConfirmation') {
      this.deactivateElection();
    } else if (callbackData === 'deactivateElectionFinished') {
    } else if (callbackData === 'deactivateElectionFailed') {
    } else if (callbackData === 'voteHistoryFailed') {
    }
  }

  manageParticipant() {
    this.modalElectionParticipantComponent.showModal(this.electionData);
  }

  openModalVote() {
    this.modalElectionVoteComponent.showModal(this.electionData, this.candidateListInfo);
  }

  showHistory() {
    if (this.passphrase == null || this.passphrase === undefined || this.passphrase === '') {
      this.passphraseError = true;
      return;
    }
    this.passphraseError = null;
    this.es.myVote(this.electionData.id, {
      passphrase: window.btoa(this.passphrase)
    }).subscribe(
      res5 => {
        this.gs.log('[VotingHistory]', res5);
        this.accountUnlocked = true;
        this.passphrase = null;
        this.voteHistoryData = res5.result.trxMyVote;
        this.voted = this.voteHistoryData.voterVoted;
        if (this.voted) {
          const selectedParticipant = this.voterParticipantsAccepted.find(vPA => vPA.participantAddress === this.currentUser.pubKey);
          this.us.getTransactionHash(selectedParticipant.trxAddressVote).subscribe(
            res => {
              this.trxVote = res.result;
            }
          );
        }
      },
      err => {
        this.passphrase = null;
        this.confirmModal.showModal({
          callbackData: 'voteHistoryFailed',
          title: `Receipt '${this.electionData.electionName}'`,
          body: JSON.stringify(err.error.result.message),
          submit: 'OK'
        });
      }
    );
  }

  getCandidateByAddress(address) {
    return this.candidateListInfo.find(cLI => cLI.pubKey.toLowerCase() === address.toLowerCase());
  }

  callbackFromVote() {
    this.accountUnlocked = false;
    this.getElectionData(this.electionData.id);
  }

}
