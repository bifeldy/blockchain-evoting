import { Component, OnInit } from '@angular/core';

import { GlobalService } from 'src/app/_shared/services/global.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(
    private gs: GlobalService
  ) {
  }

  ngOnInit() {
    if (window.location.protocol === 'https:') {
      this.gs.log(`[IFRAME-PROTOCOL] 'https' Detected, Changing To HTTP Instead.`);
      window.location.protocol = 'http:';
    }
  }

}
