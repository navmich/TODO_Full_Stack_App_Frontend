import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HelloWorldBean } from './data/welcome-data.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthenticationService {
  constructor(injector: Injector, private http: HttpClient) {}

  executeJWTAuthenticationService(
    username,
    password
  ): Observable<AuthenticationBean> {
    return this.http
      .post<any>(`${API_URL}/authenticate`, { username, password })
      .pipe(
        map((data) => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        })
      );
  }
  // testing comment
  executeAuthenticationService(
    username,
    password
  ): Observable<AuthenticationBean> {
    let basicAuthHeaderString =
      'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString,
    });

    return this.http
      .get<AuthenticationBean>(`${API_URL}/basicauth`, { headers })
      .pipe(
        map((data) => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        })
      );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    return sessionStorage.getItem(AUTHENTICATED_USER) !== null;
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
