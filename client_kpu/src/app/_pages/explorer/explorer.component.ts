import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChainService } from 'src/app/_shared/services/chain.service';
import { GlobalService } from 'src/app/_shared/services/global.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit, OnDestroy {

  latestBlocks = [];

  page = 1;
  row = 20;

  refreshBlockLive = null;

  constructor(
    private gs: GlobalService,
    private cs: ChainService
  ) { }

  ngOnInit() {
    this.refreshBlockLive = setInterval(() => {
      this.getLatestBlock(this.page, this.row);
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.refreshBlockLive);
  }

  nextPage() {
    this.page += 1;
    this.getLatestBlock(this.page, this.row);
  }

  prevPage() {
    this.page -= 1;
    if (this.page <= 0) {
      this.page = 1;
    }
    this.getLatestBlock(this.page, this.row);
  }

  getLatestBlock(page, row) {
    this.cs.getLatestBlock(page, row).subscribe(
      res => {
        this.gs.log(`[EXPLORER-BLOCK]`, res);
        this.latestBlocks = res.results.sort((a, b) => (a.number < b.number) ? 1 : -1);
      }
    );
  }

}
