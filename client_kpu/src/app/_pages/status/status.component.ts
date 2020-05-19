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
    const currentUrl = window.location.href;
    if (currentUrl.startsWith('https')) {
      this.gs.log(`[IFRAME-STATUS] 'https' Detected, Reload And Using HTTP Instead.`);
      window.location.href = 'http' + currentUrl.slice(5, currentUrl.length);
      window.location.reload();
    }
  }

}
