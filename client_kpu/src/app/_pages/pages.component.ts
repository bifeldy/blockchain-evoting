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
      { bannerImage: 'https://img.alinea.id/img/content/2020/03/04/67257/mencari-formula-terbaik-pemilu-serentak-drimdKVyAM.jpg' },
      { bannerImage: 'https://www.goodnewsfromindonesia.id/uploads/post/large-pemilu-2-a3c65072330fe3159814fa7a3e5bbc11.jpg' }
    ];
  }

  ngOnInit() {
  }

}
