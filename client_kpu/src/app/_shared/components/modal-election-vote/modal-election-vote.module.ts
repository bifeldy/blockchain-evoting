import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule, ButtonsModule } from 'ngx-bootstrap';

import { ModalElectionVoteComponent } from './modal-election-vote.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalModule } from '../confirm-modal/confirm-modal.module';

@NgModule({
  declarations: [ModalElectionVoteComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ConfirmModalModule
  ],
  exports: [ModalElectionVoteComponent]
})
export class ModalElectionVoteModule { }
