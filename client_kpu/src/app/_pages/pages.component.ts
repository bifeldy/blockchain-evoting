import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_shared/services/auth.service';

import { environment } from 'src/environments/environment';
import { GlobalService } from '../_shared/services/global.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  banner = [];

  constructor(
    public router: Router,
    public gs: GlobalService,
    private as: AuthService
  ) {
    this.banner = [
      { bannerImage: 'http://via.placeholder.com/1280x256/' + this.gs.randomColor },
      { bannerImage: 'http://via.placeholder.com/1280x256/' + this.gs.randomColor }
    ];
  }

  ngOnInit() {
  }

}
