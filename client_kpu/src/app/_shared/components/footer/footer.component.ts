import { Component, OnInit } from '@angular/core';

import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  githubLastCommit = null;

  constructor(
    private gh: GithubService
  ) {
    this.githubLastCommit = this.gh.githubLastCommit;
  }

  ngOnInit() {
  }

}
