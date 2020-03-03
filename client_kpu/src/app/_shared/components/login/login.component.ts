import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';

import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fg: FormGroup;
  submitted = false;
  showPassword = false;

  returnUrl = '/';
  loginImg = 'https://via.placeholder.com/462x440.png';
  bgLoginImg = '/assets/img/bg-login.svg';
  loginInfo = 'Silahkan login terlebih dahulu~';

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    public as: AuthService
  ) {
    if (this.as.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  get loginFormVal() {
    return this.fg.controls;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    this.fg = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberMe: [false, []]
    });
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  onClickedSubmit() {
    this.submitted = true;
    this.loginInfo = 'Harap Menunggu ...';
    if (this.fg.invalid) {
      this.loginInfo = 'Periksa Dan Isi Kembali Data Anda!';
      this.submitted = false;
      return;
    }
    this.gs.log('[COMPONENT_LOGIN]', this.fg.value);
    if (this.fg.valid) {
      this.submitted = true;
      this.as.login({
        username: this.fg.value.username,
        password: CryptoJS.SHA512(this.fg.value.password).toString(),
        rememberMe: this.fg.value.rememberMe
      }).subscribe(
        (res: any) => {
          localStorage.setItem(environment.tokenName, res.result.token);
          this.as.verify(localStorage.getItem(environment.tokenName)).subscribe(
            success => this.router.navigate([this.returnUrl]),
            error => this.as.logout()
          );
        },
        err => {
          this.loginInfo = err.error.result.message || err.error.info;
          this.submitted = false;
        }
      );
    }
  }
}
