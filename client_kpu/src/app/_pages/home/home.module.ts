import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { ModalElectionDetailModule } from 'src/app/_shared/components/modal-election-detail/modal-election-detail.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModalElectionDetailModule
  ]
})
export class HomeModule { }
