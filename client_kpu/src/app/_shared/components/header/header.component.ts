import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GithubService } from '../../services/github.service';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  githubLastCommit = null;

  constructor(
    private gh: GithubService,
    private gs: GlobalService,
    public as: AuthService,
    private router: Router
  ) {
    this.githubLastCommit = this.gh.githubLastCommit;
  }

  ngOnInit() {
  }

}
