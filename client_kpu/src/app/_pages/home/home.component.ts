import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  banner = [
    { banner_image: 'http://via.placeholder.com/1280x256' },
    { banner_image: 'http://via.placeholder.com/1280x256' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
