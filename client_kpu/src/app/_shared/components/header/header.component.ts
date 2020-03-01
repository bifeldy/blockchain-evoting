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

  constructor(
    private api: ApiService,
    public as: AuthService,
  ) { }

  ngOnInit() {
    this.as.currentUser.subscribe(user => this.currentUser = user);
    this.api.getData('https://api.github.com/repos/Bifeldy/blockchain-evoting/commits').subscribe(res => this.githubLastCommit = res[0]);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

}
