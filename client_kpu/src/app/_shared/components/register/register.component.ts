import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';
import { ApiService } from '../../services/api.service';

import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fg: FormGroup;
  submitted = false;

  registerImg = 'https://via.placeholder.com/462x532.png';
  bgRegisterImg = '/assets/img/bg-login.svg';
  registerInfo = 'Ayo bergabung dengan komunitas kami~';

  kpuRiUserData = null;
  showPassword = false;
  googleCaptcha = null;
  ethereumAccount = null;

  registerStep = 0;

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService,
    private router: Router,
    private as: AuthService,
    private api: ApiService
  ) {
    if (this.as.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  get registerFormVal() {
    return this.fg.value;
  }

  ngOnInit() {
    this.registerStep = 1;
    this.initializeForm();
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  initializeForm(data = null) {
    this.fg = this.fb.group({
      nik: [data ? data.nik : null, Validators.compose([
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
          Validators.pattern('^[0-9]*$')
        ])
      ],
      name: [data ? data.nama : null, Validators.compose([Validators.required])],
      email: [data ? data.email : null, Validators.compose([
          Validators.email,
          Validators.required
        ])
      ],
      phone: [data ? data.phone : null, Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(13),
          Validators.pattern('^[0-9]*$')
        ])
      ],
      password: [data ? data.password : null, Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      ],
      retype_password: [data ? data.retype_password : null, Validators.compose([Validators.required])],
      googleCaptchaResponse: [data ? data.googleCaptchaResponse : null, Validators.compose([Validators.required])]
    },
    {
      validator: this.customValidator
    });
  }

  customValidator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('retype_password').value;
    if (password != null && password !== undefined && password !== '' && password.length < 8) {
      control.get('password').setErrors({ noPasswordMin: true });
    }
    if (confirmPassword != null && confirmPassword !== undefined && confirmPassword !== '' && password !== confirmPassword) {
      control.get('retype_password').setErrors({ noPasswordMatch: true });
    }
  }

  resolved(captchaResponse, captchaRef) {
    this.gs.log(`[GOOGLE_CAPTCHA] ${captchaResponse}`);
    this.googleCaptcha = captchaRef;
    this.fg.value.googleCaptchaResponse = captchaResponse;
    if (captchaResponse) {
      this.registerInfo = 'Sedang Mengambil Data ..';
      this.api.postData('https://lindungihakpilihmu.kpu.go.id/index.php/dpt/proses_ceknik', {
        nik: this.fg.value.nik,
        nama: this.fg.value.name,
        respon: this.fg.value.googleCaptchaResponse
      }, true).subscribe(
        res => {
          this.gs.log('[KPU_RI-CEK_NIK]', res);
          if (res.message === 'failed') {
            this.registerInfo = res.data;
            this.fg.value.googleCaptchaResponse = null;
            this.kpuRiUserData = null;
            this.googleCaptcha.reset();
          } else if (res.message === 'success') {
            this.kpuRiUserData = res.data;
            Object.keys(this.kpuRiUserData).forEach((key, idx) => {
              this.kpuRiUserData[key] = this.kpuRiUserData[key].toLowerCase().replace(/\b[a-zA-Z]/g, (v) => v.toUpperCase());
            });
            this.registerInfo = `
              ${res.data.nama} - ${res.data.jenis_kelamin} - ${res.data.tempat_lahir} - ${res.data.nik} -
              ${res.data.namaKelurahan} - ${res.data.namaKecamatan} - ${res.data.namaKabKota} - ${res.data.namaPropinsi}
            `.replace(/\n/g, ' ').replace(/ +(?= )/g, '').trim();
            this.fg.controls.nik.disable();
            this.fg.controls.name.disable();
            this.initializeForm({ ...this.kpuRiUserData, ...this.fg.value });
          }
        }
      );
    }
  }

  onRegisterPrevious() {
    if (this.registerStep <= 1) {
      this.registerStep = 1;
    } else {
      this.registerStep -= 1;
    }
  }

  onRegisterNext() {
    if (this.registerStep === 2) {
      this.registerWebAccount();
    } else if (this.registerStep === 3) {
      this.settingUpEthereumAccount();
    } else {
      this.registerStep += 1;
    }
  }

  registerWebAccount() {
    this.submitted = true;
    this.registerInfo = 'Harap Menunggu ...';
    if (this.fg.invalid) {
      this.registerInfo = 'Periksa Dan Isi Kembali Data Anda!';
      this.submitted = false;
      return;
    }
    if (this.fg.valid && this.kpuRiUserData) {
      console.log(this.fg.value);
      console.log(this.kpuRiUserData);
      this.api.postData('/register', {
        nik: this.kpuRiUserData.nik,
        name: this.kpuRiUserData.nama,
        phone: this.fg.value.phone,
        email: this.fg.value.email,
        password: CryptoJS.SHA512(this.fg.value.password).toString()
      }, null).subscribe(
        (res: any) => {
          localStorage.setItem(environment.tokenName, res.result.token);
          this.as.verify(localStorage.getItem(environment.tokenName)).subscribe(
            success => this.router.navigate(['/home']),
            error => this.as.logout()
          );
        },
        err => {
          this.registerInfo = err.error.result.message || err.error.info;
          this.submitted = false;
        }
      );
    }
  }

  settingUpEthereumAccount() {
    // TODO:
  }

}