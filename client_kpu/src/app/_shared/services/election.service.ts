import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

import { GlobalService } from './global.service';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

import { Election } from '../models/election';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  electionList: Election[] = null;

  myElectionCreated: Election[] = [];
  myElectionJoined: Election[] = [];

  constructor(
    private api: ApiService,
    private as: AuthService,
    private gs: GlobalService
  ) {
    this.loadElection('active');
    this.as.currentUser.subscribe(user => {
      if (user) {
        this.loadMyElection();
      } else {
        this.myElectionCreated = [];
        this.myElectionJoined = [];
      }
    });
  }

  loadElection(status = 'all', row = 10) {
    this.api.getData(`/election?status=${status}&row=${row}`).subscribe(
      res => {
        this.electionList = res.results;
        this.gs.log('[electionList]', this.electionList);
      },
      err => {}
    );
  }

  loadElectionByCreator(electionCreator, status = 'all', row = 10) {
    return this.api.getData(`/election/?status=${status}&electionCreator=${electionCreator}&row=${row}`);
    // .pipe(tap(
    //   res => {},
    //   err => {}
    // ));
  }

  loadMyElection() {
    this.api.getData(`/election/created`).subscribe(
      res => this.myElectionCreated = res.results,
      err => {}
    );
    this.api.getData(`/election/joined`).subscribe(
      res => this.myElectionJoined = res.results,
      err => {}
    );
  }

  createNewElection(electionData) {
    return this.api.postData(`/election/create`, electionData);
  }

  endElectionPeriode(electionId) {
    return this.api.postData(`/election/end`, electionId);
  }

}
