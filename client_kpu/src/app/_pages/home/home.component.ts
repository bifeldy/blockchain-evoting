import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  banner = [
    { bannerImage: 'http://via.placeholder.com/1280x256' },
    { bannerImage: 'http://via.placeholder.com/1280x256' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
