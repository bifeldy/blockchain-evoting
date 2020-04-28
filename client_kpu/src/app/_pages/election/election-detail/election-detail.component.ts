import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/_shared/services/auth.service';

import { ModalElectionDetailComponent } from 'src/app/_shared/components/modal-election-detail/modal-election-detail.component';
import { ApiService } from 'src/app/_shared/services/api.service';

import { Role } from '../../../_shared/models/role';
import { GlobalService } from 'src/app/_shared/services/global.service';

@Component({
  selector: 'app-election-detail',
  templateUrl: './election-detail.component.html',
  styleUrls: ['./election-detail.component.css']
})
export class ElectionDetailComponent implements OnInit {

  @ViewChild(ModalElectionDetailComponent, { static: true }) modalElectionDetail: ModalElectionDetailComponent;

  electionData = null;
  currentUser = null;

  participant = false;
  voted = false;

  voterParticipants = [];
  creator = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public gs: GlobalService,
    public as: AuthService,
    private api: ApiService
  ) {
    for (let i = 0; i < 120; i++) {
      this.voterParticipants.push(this.gs.randomColor);
    }
  }

  ngOnInit() {
    this.as.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.route.params.subscribe(params => {
      this.api.getData(`/election/${params.electionId}`).subscribe(
        res => {
          this.electionData = res.result;
          this.api.getData(`/user/${this.electionData.electionCreator}`).subscribe(
            rs => {
              this.creator = rs.result;
            }
          );
        }
      );
    });
  }

  get isVoter() {
    return this.currentUser && this.currentUser.role === Role.Voter;
  }

  loginFromElection() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
  }

  joinFromElection() {
    this.modalElectionDetail.showModal(this.electionData);
  }

  voteFromElection() {

  }

}
