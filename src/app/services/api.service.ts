import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import storageKeys from '../shared/storageKeys';

@Injectable({
  providedIn: 'root',
})
export default class APIService {
  constructor(private http: HttpClient) {}

  get(url: string, authReq: boolean = false) {
    let allurl = environment.baseURL + url;
    if (authReq) {
      let token = localStorage.getItem(storageKeys.aqarToken) || '';
      return this.http.get(allurl, { headers: { token } });
    } else {
      return this.http.get(allurl);
    }
  }

  post(url: string, body: any, authReq = false) {
    let allurl = environment.baseURL + url;
    let token = localStorage.getItem(storageKeys.aqarToken) || '';

    if (authReq) {
      return this.http.post(allurl, body, { headers: { token } });
    } else {
      return this.http.post(allurl, body);
    }
  }

  delete(url: string, token: any, body: any) {
    let allurl = environment.baseURL + url;
    return this.http.delete(allurl, {
      headers: { token },
      body,
    });
  }
}
