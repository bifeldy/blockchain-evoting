import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  githubLastCommit = {
    sha: '0x0'
  };

  constructor() { }

  getGithubRepositoryInformation() {

  }

}
