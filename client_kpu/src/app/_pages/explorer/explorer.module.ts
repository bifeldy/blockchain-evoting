import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ExplorerComponent } from './explorer.component';

const routes: Routes = [
  {
    path: '',
    component: ExplorerComponent
  }
];

@NgModule({
  declarations: [ExplorerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ExplorerModule { }
