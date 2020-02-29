import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../services/global.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private gs: GlobalService,
    private as: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.as.currentUserValue;
    const userToken = localStorage.getItem(environment.tokenName);
    if (currentUser && userToken) {
      this.gs.log('[INTERCEPT_REQUEST]', userToken);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`
        }
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    } else {
      if (request.headers.get('Content-Type') === 'multipart/form-data') {
        request = request.clone({
          headers: request.headers.delete('Content-Type', 'multipart/form-data')
        });
      }
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return next.handle(request);
  }
}