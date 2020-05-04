import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmModalModule } from 'src/app/_shared/components/confirm-modal/confirm-modal.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  }
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ConfirmModalModule
  ]
})
export class AdminModule { }
