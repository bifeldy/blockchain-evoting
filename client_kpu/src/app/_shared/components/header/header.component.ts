import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Role } from '../../models/role';
import { UserService } from '../../services/user.service';

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

  slicedGithubSha = null;
  slicedUserName = null;

  constructor(
    private api: ApiService,
    public as: AuthService,
    public us: UserService
  ) { }

  ngOnInit() {
    this.windowWidth = window.innerWidth || window.outerWidth;
    this.windowHeight = window.innerHeight || window.outerHeight;
    this.as.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.slicedUserName = this.currentUser.name;
        this.sliceName();
        this.us.getAccountBalance(this.currentUser.pubKey);
      }
    });
    this.api.getData('https://api.github.com/repos/Bifeldy/blockchain-evoting/commits').subscribe(res => {
      this.githubLastCommit = res[0];
      if (this.githubLastCommit) {
        this.slicedGithubSha = this.githubLastCommit.sha;
        this.sliceGit();
      }
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMiner() {
    return this.currentUser && this.currentUser.role === Role.Miner;
  }

  get isVoter() {
    return this.currentUser && this.currentUser.role === Role.Voter;
  }

  onWindowResize($event) {
    this.windowWidth = $event.target.innerWidth || $event.target.outerWidth;
    this.windowHeight = $event.target.innerHeight || $event.target.outerHeight;
    if (this.currentUser) {
      this.sliceName();
    }
    if (this.githubLastCommit) {
      this.sliceGit();
    }
  }

  private sliceName() {
    if (this.currentUser) {
      if (this.windowWidth < 768) {
        this.slicedUserName = this.currentUser.name.slice(0, 30);
        if (this.currentUser && this.currentUser.name.length > 30) {
          this.slicedUserName = this.slicedUserName.trim() + '...';
        }
      } else {
        this.slicedUserName = this.currentUser.name.slice(0, 15);
        if (this.currentUser && this.currentUser.name.length > 15) {
          this.slicedUserName = this.slicedUserName.trim() + '...';
        }
      }
    }
  }

  private sliceGit() {
    if (this.githubLastCommit) {
      if (this.windowWidth < 768) {
        this.slicedGithubSha = this.githubLastCommit.sha.slice(0, 20);
        if (this.githubLastCommit.sha.length > 20) {
          this.slicedGithubSha = this.slicedGithubSha.trim() + '...';
        }
      } else {
        this.slicedGithubSha = this.githubLastCommit.sha.slice(0, 8);
        if (this.githubLastCommit.sha.length > 8) {
          this.slicedGithubSha = this.slicedGithubSha.trim() + '...';
        }
      }
    }
  }

  logout() {
    this.as.logout();
    location.reload();
  }

}
