import { Component, OnInit } from '@angular/core';

import { ChainService } from 'src/app/_shared/services/chain.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  latestBlocks = [];

  page = 1;
  row = 20;

  constructor(
    private cs: ChainService
  ) { }

  ngOnInit() {
    this.getLatestBlock(this.page, this.row);
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
        this.latestBlocks = res.results.sort((a, b) => (a.number < b.number) ? 1 : -1);
      }
    );
  }

}
