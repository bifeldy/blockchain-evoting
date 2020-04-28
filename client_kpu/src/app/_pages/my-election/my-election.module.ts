import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MyElectionComponent } from './my-election.component';
import { ModalElectionDetailModule } from 'src/app/_shared/components/modal-election-detail/modal-election-detail.module';

const routes: Routes = [
  {
    path: '',
    component: MyElectionComponent
  }
];

@NgModule({
  declarations: [MyElectionComponent],
  imports: [
    CommonModule,
    ModalElectionDetailModule,
    RouterModule.forChild(routes)
  ]
})
export class MyElectionModule { }
