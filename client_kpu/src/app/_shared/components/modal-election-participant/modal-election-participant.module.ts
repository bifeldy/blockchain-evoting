import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalModule, ButtonsModule } from 'ngx-bootstrap';

import { ModalElectionParticipantComponent } from './modal-election-participant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalModule } from '../confirm-modal/confirm-modal.module';

@NgModule({
  declarations: [ModalElectionParticipantComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ConfirmModalModule
  ],
  exports: [ModalElectionParticipantComponent]
})
export class ModalElectionParticipantModule { }
