import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private as: AuthService
  ) { }

  ngOnInit() {
    this.as.verify(localStorage.getItem(environment.tokenName)).subscribe(
      res => {},
      err => {}
    );
  }

}
