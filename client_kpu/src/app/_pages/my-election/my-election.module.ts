import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MyElectionComponent } from './my-election.component';
import { ModalElectionDetailModule } from 'src/app/_shared/components/modal-election-detail/modal-election-detail.module';
import { CreateElectionComponent } from './create-election/create-election.component';

const routes: Routes = [
  {
    path: '',
    component: MyElectionComponent
  },
  {
    path: 'create',
    component: CreateElectionComponent
  }
];

@NgModule({
  declarations: [MyElectionComponent, CreateElectionComponent],
  imports: [
    CommonModule,
    ModalElectionDetailModule,
    RouterModule.forChild(routes)
  ]
})
export class MyElectionModule { }
