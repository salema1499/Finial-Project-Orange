import { Injectable } from '@angular/core';
import storageKeys from '../shared/storageKeys';
import APIService from './api.service';
import jwtdecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  isLoggedIn = false;
  userToken: string = '';

  constructor(private apiService: APIService) {}

  login(email: string, password: string) {
    return this.apiService.post('/user/login', {
      email,
      password,
    });
  }

  register(email: string, password: string, username: string) {
    return this.apiService.post('/user/register', {
      email,
      password,
      username,
    });
  }

  deleteUser(id: string) {
    let token = localStorage.getItem(storageKeys.aqarToken);
    return this.apiService.delete(`/user`, token, {
      id,
    });
  }

  isAdmin() {
    let userData = localStorage.getItem(storageKeys.userData);
    return userData ? JSON.parse(userData).role === 'admin' : false;
  }

  setUserData(token: string) {
    let userData = token ? jwtdecode(token) : null;
    console.log('user Data : ', userData);
    localStorage.setItem(storageKeys.aqarToken, token);
    localStorage.setItem(storageKeys.userData, JSON.stringify(userData));
  }

  logout() {
    localStorage.clear();
  }

  listUsers() {
    return this.apiService.get('/user', true);
  }
}
