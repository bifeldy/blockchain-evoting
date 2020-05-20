import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ExplorerComponent } from './explorer.component';
import { BlockDetailComponent } from './block-detail/block-detail.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

const routes: Routes = [
  {
    path: 'block/:blockHash',
    component: BlockDetailComponent
  },
  {
    path: 'transaction/:transactionHash',
    component: TransactionDetailComponent
  },
  {
    path: '',
    component: ExplorerComponent
  }
];

@NgModule({
  declarations: [
    ExplorerComponent,
    BlockDetailComponent,
    TransactionDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ExplorerModule { }
