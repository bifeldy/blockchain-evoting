import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  githubLastCommit = null;
  currentUser = null;

  windowWidth = null;
  windowHeight = null;

  slicedGithubSha = '';
  slicedUserName = '';

  constructor(
    private api: ApiService,
    public as: AuthService,
  ) { }

  ngOnInit() {
    this.as.currentUser.subscribe(user => {
      this.currentUser = user;
      this.api.getData('https://api.github.com/repos/Bifeldy/blockchain-evoting/commits').subscribe(res => {
        this.githubLastCommit = res[0];
        this.resizeText(
          window.innerWidth || window.outerWidth,
          window.innerHeight || window.outerHeight
        );
      });
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  onWindowResize($event) {
    this.resizeText(
      $event.target.innerWidth || $event.target.outerWidth,
      $event.target.innerHeight || $event.target.outerHeight
    );
  }

  resizeText(width, height) {
    this.windowWidth = width;
    this.windowHeight = height;
    if (this.windowWidth < 768) {
      this.slicedGithubSha = this.githubLastCommit.sha.slice(0, 20);
      if (this.currentUser) {
        this.slicedUserName = this.currentUser.name.slice(0, 30);
      }
    } else {
      this.slicedGithubSha = this.githubLastCommit.sha.slice(0, 8);
      if (this.currentUser) {
        this.slicedUserName = this.currentUser.name.slice(0, 15);
      }
    }
    if (this.githubLastCommit.sha.length > 22) {
      this.slicedGithubSha = this.slicedGithubSha.trim() + '...';
    }
    if (this.currentUser && this.currentUser.name.length > 22) {
      this.slicedUserName = this.slicedUserName.trim() + '...';
    }
  }

}
