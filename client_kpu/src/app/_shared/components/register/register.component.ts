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

  registerInfo = 'Ayo bergabung dengan kami~';
  registerErrorData = null;

  kpuRiUserData = null;
  showPassword = false;
  googleCaptcha = null;

  utcFileName = 'Upload ETH UTC File ..';

  registerStep = 0;

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService,
    private router: Router,
    public as: AuthService,
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
      reTypePassword: [data ? data.reTypePassword : null, Validators.compose([Validators.required])],
      googleCaptchaResponse: [data ? data.googleCaptchaResponse : null, Validators.compose([Validators.required])],
      ethAccount: [data ? data.ethAccount : '', Validators.compose([Validators.required])],
      ethAccountImport: [data ? data.ethAccountImport : null]
    },
    {
      validator: this.customValidator
    });
  }

  customValidator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('reTypePassword').value;
    if (password != null && password !== undefined && password !== '' && password.length < 8) {
      control.get('password').setErrors({ noPasswordMin: true });
    }
    if (confirmPassword != null && confirmPassword !== undefined && confirmPassword !== '' && password !== confirmPassword) {
      control.get('reTypePassword').setErrors({ noPasswordMatch: true });
    }
  }

  resolved(captchaResponse, captchaRef) {
    this.gs.log(`[GOOGLE_CAPTCHA] ${captchaResponse}`);
    this.registerErrorData = null;
    this.googleCaptcha = captchaRef;
    this.fg.value.googleCaptchaResponse = captchaResponse;
    if (captchaResponse) {
      this.registerInfo = 'Sedang Mengambil Data ..';
      const registerTimedOut = setTimeout(() => {
        this.registerInfo = 'Server Tidak Merespon, Silahkan Coba Lagi Nanti ..';
      }, 60 * 1000);
      this.api.postData('/kpu/cek-nik', {
        nik: this.fg.value.nik,
        name: this.fg.value.name,
        'g-recaptcha-response': this.fg.value.googleCaptchaResponse
      }, null).subscribe(
        res => {
          this.gs.log('[KPU_RI-CEK_NIK]', res);
          if (res.result.message === 'failed') {
            this.registerInfo = res.result.data.pesan;
            this.fg.value.googleCaptchaResponse = null;
            this.kpuRiUserData = null;
            this.googleCaptcha.reset();
          } else if (res.result.message === 'success') {
            this.kpuRiUserData = { ...res.result.data, nik: this.fg.value.nik};
            Object.keys(this.kpuRiUserData).forEach((key, idx) => {
              this.kpuRiUserData[key] = this.kpuRiUserData[key].toLowerCase().replace(/\b[a-zA-Z]/g, (v) => v.toUpperCase());
            });
            this.registerInfo = `
              ${this.kpuRiUserData.nama} - ${this.kpuRiUserData.jenis_kelamin} - ${this.kpuRiUserData.tempat_lahir} -
              ${this.kpuRiUserData.nik} - ${this.kpuRiUserData.namaKel} - ${this.kpuRiUserData.namaKec} -
              ${this.kpuRiUserData.namaKabko} - ${this.kpuRiUserData.namaPropinsi}
            `.replace(/\n/g, ' ').replace(/ +(?= )/g, '').trim();
            this.fg.controls.nik.disable();
            this.fg.controls.name.disable();
            this.initializeForm({ ...this.kpuRiUserData, ...this.fg.value });
          }
          clearTimeout(registerTimedOut);
        },
        err => {
          this.registerInfo = err.error.result.message || err.result.message || err.result.data.pesan;
          this.googleCaptcha.reset();
          clearTimeout(registerTimedOut);
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
    this.registerErrorData = null;
    if (this.registerStep === 1) {
      this.checkWebAccount({
        nik: this.kpuRiUserData.nik
      });
    } else if (this.registerStep === 2) {
      this.checkWebAccount({
        phone: this.fg.value.phone,
        email: this.fg.value.email
      });
    } else if (this.registerStep === 3) {
      this.settingUpEthereumAccount();
    }
  }

  checkWebAccount(formData) {
    this.registerInfo = 'Mengecek Data Akun ...';
    this.api.postData('/check-account', formData, null).subscribe(
      (res: any) => {
        this.registerInfo = res.result.message;
        this.registerStep += 1;
      },
      err => {
        this.registerInfo = err.error.result.message || err.error.info;
        this.registerErrorData = err.error.result || err.error.info;
        if ('nik' in formData) {
          this.kpuRiUserData = null;
          this.fg.controls.nik.enable();
          this.fg.controls.name.enable();
          this.googleCaptcha.reset();
        }
      }
    );
  }

  registerWebAccount(userData, ethData = null) {
    this.gs.log('[REGISTER_WEB_ACCOUNT]', userData);
    this.submitted = true;
    this.registerInfo = 'Harap Menunggu ...';
    if (this.kpuRiUserData) {
      this.api.postData('/register', userData, null).subscribe(
        (res: any) => {
          localStorage.setItem(environment.tokenName, res.result.token);
          this.as.verify(localStorage.getItem(environment.tokenName)).subscribe(
            success => this.router.navigate(['/home']),
            error => this.as.logout()
          );
        },
        err => {
          this.registerInfo = err.error.result.message || err.error.info;
          this.registerErrorData = err.error.result;
          this.submitted = false;
        }
      );
    }
  }

  onFileSelected($event) {
    const selectedFile = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onload = (e) => {
      console.log(e);
      this.utcFileName = selectedFile.name;
      // this.fg.controls.ethAccountImport.patchValue(e.target.result);
    };
  }

  settingUpEthereumAccount() {
    this.gs.log('[REGISTER_ETH_ACCOUNT]');
    //
    this.registerWebAccount({
      nik: this.kpuRiUserData.nik,
      name: this.kpuRiUserData.nama,
      phone: this.fg.value.phone,
      email: this.fg.value.email,
      password: CryptoJS.SHA512(this.fg.value.password).toString()
    });
  }
}
