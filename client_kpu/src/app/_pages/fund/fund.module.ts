import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FundComponent } from './fund.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalModule } from 'src/app/_shared/components/confirm-modal/confirm-modal.module';

const routes: Routes = [
  {
    path: '',
    component: FundComponent
  }
];

@NgModule({
  declarations: [FundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ConfirmModalModule
  ]
})
export class FundModule { }
