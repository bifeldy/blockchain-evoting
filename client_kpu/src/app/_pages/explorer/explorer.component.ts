import { Component, OnInit } from '@angular/core';

import { GlobalService } from 'src/app/_shared/services/global.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  constructor(
    private gs: GlobalService
  ) { }

  ngOnInit() {
    if (window.location.protocol === 'https:') {
      this.gs.log(`[IFRAME-PROTOCOL] 'https' Detected, Changing To HTTP Instead.`);
      window.location.protocol = 'http:';
    }
  }

}
