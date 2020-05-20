import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ChainService } from 'src/app/_shared/services/chain.service';

import { Transaction } from 'src/app/_shared/models/transaction';
import { GlobalService } from 'src/app/_shared/services/global.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  transactions: Transaction = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gs: GlobalService,
    private cs: ChainService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.cs.getDetailTransaction(params.get('transactionHash')).subscribe(
          res => {
            this.gs.log('[Transaction]', res);
            this.transactions = res.result;
            if (!this.transactions) {
              this.router.navigateByUrl('/explorer');
            }
          },
          err => {
            this.router.navigateByUrl('/explorer');
          }
        );
      }
    );
  }

}
