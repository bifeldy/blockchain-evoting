import { Component, OnInit, ViewChild } from '@angular/core';

import { ElectionService } from 'src/app/_shared/services/election.service';
import { ModalElectionDetailComponent } from 'src/app/_shared/components/modal-election-detail/modal-election-detail.component';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/_shared/services/global.service';
import { ChainService } from 'src/app/_shared/services/chain.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(ModalElectionDetailComponent, { static: true }) modalElectionDetail: ModalElectionDetailComponent;

  randomColor = [];

  electionList = [];
  latestBlocks = [];

  constructor(
    public gs: GlobalService,
    public es: ElectionService,
    private router: Router,
    private cs: ChainService
  ) {
    for (let i = 0; i < 10; i++) {
      this.randomColor.push(this.gs.randomColor);
    }
  }

  ngOnInit() {
    this.es.loadElection('active').subscribe(
      res => {
        this.gs.log('[ElectionList]', res);
        this.electionList = res.results;
      }
    );
    this.cs.getLatestBlock(1, 5).subscribe(
      res => {
        this.latestBlocks = res.results.sort((a, b) => (a.number < b.number) ? 1 : -1);
      }
    );
  }

  openElection(electionData) {
    this.router.navigateByUrl(`/election/${electionData.id}`);
  }

  openElectionModal(electionData) {
    this.modalElectionDetail.showModal(electionData);
  }

}
