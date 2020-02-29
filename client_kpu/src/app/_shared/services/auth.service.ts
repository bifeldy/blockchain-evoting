import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { GlobalService } from './global.service';

import { ApiService } from './api.service';

import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private gs: GlobalService
  ) {
    let userSession = null;
    try {
      const token = localStorage.getItem(environment.tokenName);
      const userEncrypted = sessionStorage.getItem(environment.sessionName);
      const userDecrypted = CryptoJS.AES.decrypt(userEncrypted, token).toString(CryptoJS.enc.Utf8);
      userSession = JSON.parse(userDecrypted);
    } catch (e) { }
    this.currentUserSubject = new BehaviorSubject<any>(userSession);
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
        const userEncrypted = CryptoJS.AES.encrypt(userSession, token).toString();
        sessionStorage.setItem(environment.sessionName, userEncrypted);
        return respVerify.result.user;
      }));
  }

  login(loginData: any) {
    this.gs.log('[AUTH_LOGIN]', loginData);
    return this.http.post<any>(`${environment.apiUrl}/login`, loginData);
  }

  logout() {
    sessionStorage.removeItem(environment.sessionName);
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

}
