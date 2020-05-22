import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ChainService } from 'src/app/_shared/services/chain.service';

import { Block } from 'src/app/_shared/models/block';
import { GlobalService } from 'src/app/_shared/services/global.service';

@Component({
  selector: 'app-block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.css']
})
export class BlockDetailComponent implements OnInit {

  block: Block = null;
  signers = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gs: GlobalService,
    private cs: ChainService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.cs.getDetailBlock(params.get('blockHash')).subscribe(
          res1 => {
            this.gs.log('[BLOCK]', res1);
            this.block = res1.result;
            if (!this.block) {
              this.router.navigateByUrl('/explorer');
            } else {
              this.cs.getBlockSigner(params.get('blockHash')).subscribe(
                res2 => {
                  this.signers = res2.results;
                }
              );
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
