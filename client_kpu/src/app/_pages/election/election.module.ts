import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ElectionComponent } from './election.component';

import { ModalElectionDetailModule } from 'src/app/_shared/components/modal-election-detail/modal-election-detail.module';
import { ElectionDetailComponent } from './election-detail/election-detail.component';

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
    ModalElectionDetailModule
  ]
})
export class ElectionModule { }
