import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import { ModalModule, ButtonsModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ConfirmModalComponent
  ]
})
export class ConfirmModalModule { }
