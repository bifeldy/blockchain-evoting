import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule, ButtonsModule } from 'ngx-bootstrap';

import { ModalElectionDetailComponent } from './modal-election-detail.component';
import { ConfirmModalModule } from '../confirm-modal/confirm-modal.module';

@NgModule({
  declarations: [ModalElectionDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    ConfirmModalModule
  ],
  exports: [ModalElectionDetailComponent]
})
export class ModalElectionDetailModule { }
