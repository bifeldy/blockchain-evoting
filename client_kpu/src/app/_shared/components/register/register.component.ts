import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public router: Router,
    public as: AuthService
  ) {
    if (this.as.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

}
