import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

import { environment } from 'src/environments/environment';

import { GlobalService } from './global.service';

import * as CryptoJS from 'crypto-js';

import User from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  keySize = 256;
  ivSize = 128;
  iterations = 100;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private gs: GlobalService,
    private cs: CookieService
  ) {
    let token = null;
    let userSession = null;
    try {
      token = localStorage.getItem(environment.tokenName);
      const userEncrypted = localStorage.getItem(environment.sessionName);
      const userDecrypted = this.decrypt(userEncrypted, token);
      userSession = JSON.parse(userDecrypted);
    } catch (e) {
      localStorage.removeItem(environment.sessionName);
    }
    this.currentUserSubject = new BehaviorSubject<User>(userSession);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  verify(token: string) {
    this.gs.log('[AUTH_VERIFY]', token);
    return this.http.post<any>(`${environment.apiUrl}/verify`, { token })
      .pipe(map(respVerify => {
        this.currentUserSubject.next(respVerify.result.user);
        const userSession = JSON.stringify(respVerify.result.user);
        const userEncrypted = this.encrypt(userSession, token);
        localStorage.setItem(environment.sessionName, userEncrypted);
        return respVerify.result.user;
      }));
  }

  login(loginData: any) {
    this.gs.log('[AUTH_LOGIN]', loginData);
    return this.http.post<any>(`${environment.apiUrl}/login`, loginData);
  }

  logout() {
    localStorage.removeItem(environment.sessionName);
    localStorage.removeItem(environment.tokenName);
    this.currentUserSubject.next(null);
    location.reload();
  }

  register(registerData: any) {
    this.gs.log('[AUTH_REGISTER]', registerData);
    return this.http.post<any>(`${environment.apiUrl}/register`, registerData)
      .pipe(map(respRegister => {
        localStorage.setItem(environment.tokenName, respRegister.result.token);
      }));
  }

  encrypt(msg, pass) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
  }

  decrypt(transitmessage, pass) {
    const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
    const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
    const encrypted = transitmessage.substring(64);
    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

}
