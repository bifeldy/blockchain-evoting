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

  loginForm: FormGroup;
  submitted = false;

  returnUrl = '/';
  loginInfo = '';

  constructor(
    public fb: FormBuilder,
    public gs: GlobalService,
    private route: ActivatedRoute,
    public router: Router,
    public as: AuthService
  ) {
    if (this.as.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  get loginFormVal() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    this.loginForm = this.fb.group({
      nik: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onClickedSubmit() {
    this.submitted = true;
    this.loginInfo = 'Harap Menunggu ...';
    if (this.loginForm.invalid) {
      this.loginInfo = 'Periksa Dan Isi Kembali Data Anda!';
      this.submitted = false;
      return;
    }
    this.gs.log('[COMPONENT_LOGIN]', this.loginForm.value);
    if (this.loginForm.valid) {
      this.submitted = true;
      this.loginForm.controls.password.patchValue(
        CryptoJS.SHA512(this.loginForm.value.password).toString()
      );
      this.as.login(this.loginForm.value).subscribe(
        (res: any) => {
          localStorage.setItem(environment.tokenName, res.result.token);
          this.as.verify(localStorage.getItem(environment.tokenName)).subscribe(
            success => this.router.navigate([this.returnUrl]),
            error => {}
          );
        },
        err => {
          this.loginInfo = err.error.info;
          this.submitted = false;
        }
      );
    }
  }
}
