import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagInputModule } from 'ngx-chips';

import { MyElectionComponent } from './my-election.component';
import { ModalElectionDetailModule } from 'src/app/_shared/components/modal-election-detail/modal-election-detail.module';
import { CreateElectionComponent } from './create-election/create-election.component';
import { ConfirmModalModule } from 'src/app/_shared/components/confirm-modal/confirm-modal.module';

const routes: Routes = [
  {
    path: 'create',
    component: CreateElectionComponent,
    data: {
      title: 'Create Election',
      description: 'Halaman Membuat Election Baru',
      keywords: 'Blockchain E-Voting'
    }
  },
  {
    path: '',
    component: MyElectionComponent
  }
];

@NgModule({
  declarations: [MyElectionComponent, CreateElectionComponent],
  imports: [
    CommonModule,
    ModalElectionDetailModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    ConfirmModalModule
  ]
})
export class MyElectionModule { }
