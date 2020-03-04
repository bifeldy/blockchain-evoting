import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, timeout, retry, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { GlobalService } from './global.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService,
  ) {}

  getData(path: string, timedOut = 3000): Observable<any> {
    this.gs.log('[API_GET]', path);
    return this.http.get(path.startsWith('http') ? environment.sniffCors + path : environment.apiUrl + path).pipe(
      catchError(err => throwError(err)),
      map(res => res), timeout(timedOut), retry(3)
    );
  }

  postData(path: string, model = {}, multipart = false, timedOut = 3000): Observable<any> {
    this.gs.log('[API_POST]', path);
    const options = {};
    let body = model;
    let timer = timedOut;
    if (multipart) {
      const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');
      Object.assign(options, { headers });
      body = this.prepareFormData(model);
      timer = 30000;
    }
    return this.http.post(path.startsWith('http') ? environment.sniffCors + path : environment.apiUrl + path, body, options).pipe(
      catchError(err => throwError(err)),
      map(res => res), timeout(timer)
    );
  }

  putData(path: string, model = {}, multipart = false, timedOut = 3000): Observable<any> {
    this.gs.log('[API_PUT]', path);
    const options = {};
    let body = model;
    if (multipart) {
      const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');
      Object.assign(options, { headers });
      body = this.prepareFormData(model);
    }
    return this.http.put(path.startsWith('http') ? environment.sniffCors + path : environment.apiUrl + path, body, options).pipe(
      catchError(err => throwError(err)),
      map(res => res), timeout(timedOut)
    );
  }

  deleteData(path: string, timedOut = 3000): Observable<any> {
    this.gs.log('[API_DEL]', path);
    return this.http.delete(path.startsWith('http') ? environment.sniffCors + path : environment.apiUrl + path).pipe(
      catchError(err => throwError(err)),
      map(res => res), timeout(timedOut)
    );
  }

  private prepareFormData(data: any) {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    return formData;
  }
}
