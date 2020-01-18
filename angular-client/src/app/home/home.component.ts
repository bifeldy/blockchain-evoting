import { Component, OnInit } from '@angular/core';

import { IpTrackerService } from '../_shared/services/ip-tracker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private ipTracker: IpTrackerService
  ) { }

  ngOnInit() {
  }

}
