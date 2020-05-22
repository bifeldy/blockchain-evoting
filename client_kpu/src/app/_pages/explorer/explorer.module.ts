import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ExplorerComponent } from './explorer.component';
import { BlockDetailComponent } from './block-detail/block-detail.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

const routes: Routes = [
  {
    path: 'block/:blockHash',
    component: BlockDetailComponent,
    data: {
      title: 'Block Detail',
      description: 'Halaman Detail Blok',
      keywords: 'Blockchain E-Voting'
    }
  },
  {
    path: 'transaction/:transactionHash',
    component: TransactionDetailComponent,
    data: {
      title: 'Transaction Detail',
      description: 'Halaman Detail Transaksi',
      keywords: 'Blockchain E-Voting'
    }
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
