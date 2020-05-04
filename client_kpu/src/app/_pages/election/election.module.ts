import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ElectionComponent } from './election.component';

import { ModalElectionDetailModule } from 'src/app/_shared/components/modal-election-detail/modal-election-detail.module';
import { ElectionDetailComponent } from './election-detail/election-detail.component';
import { FormsModule } from '@angular/forms';
import { ConfirmModalModule } from 'src/app/_shared/components/confirm-modal/confirm-modal.module';
import { ModalElectionParticipantModule } from 'src/app/_shared/components/modal-election-participant/modal-election-participant.module';
import { ModalElectionVoteModule } from 'src/app/_shared/components/modal-election-vote/modal-election-vote.module';

import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: ':electionId',
    component: ElectionDetailComponent,
    data: {
      title: 'Election Detail',
      description: 'Halaman Detail Election',
      keywords: 'Blockchain E-Voting'
    }
  },
  {
    path: '',
    component: ElectionComponent
  }
];

@NgModule({
  declarations: [ElectionComponent, ElectionDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ModalElectionDetailModule,
    ConfirmModalModule,
    ModalElectionParticipantModule,
    ModalElectionVoteModule,
    ChartsModule
  ]
})
export class ElectionModule { }
