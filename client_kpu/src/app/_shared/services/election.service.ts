import { Injectable } from '@angular/core';

import { GlobalService } from './global.service';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

import { Election } from '../models/election';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  constructor(
    private api: ApiService,
    private as: AuthService,
    private gs: GlobalService
  ) {
    this.loadElection('active');
    this.loadMyJoinedElection();
  }

  loadElection(status = 'all', row = 10) {
    return this.api.getData(`/election?status=${status}&row=${row}`);
  }

  loadMyJoinedElection() {
    return this.api.getData(`/election/my-joined-election`);
  }

  loadElectionByCreator(electionCreator, status = 'all', row = 10) {
    return this.api.getData(`/election/?status=${status}&electionCreator=${electionCreator}&row=${row}`);
  }

  createNewElection(electionData) {
    return this.api.postData(`/election/create`, electionData);
  }

  endElectionPeriode(id, data) {
    return this.api.postData(`/election/${id}/end`, data);
  }

  getElectionData(id) {
    return this.api.getData(`/election/${id}`);
  }

  getElectionCandidate(id) {
    return this.api.getData(`/election/${id}/candidate`);
  }

  getElectionParticipant(id) {
    return this.api.getData(`/election/${id}/participant`);
  }

  joinElection(id) {
    return this.api.postData(`/election/${id}/register`);
  }

  addParticipant(id, data) {
    return this.api.postData(`/election/${id}/participant`, data);
  }

  voteCandidate(id, data) {
    return this.api.postData(`/election/${id}/vote`, data);
  }

  myVote(id, data) {
    return this.api.postData(`/election/${id}/my-vote`, data);
  }

}
