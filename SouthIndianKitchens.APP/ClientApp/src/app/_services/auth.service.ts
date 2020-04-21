import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

baseUrl = '/api/auth/';

  constructor(private http: HttpClient) {   }

login(model: any) {

  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
            localStorage.setItem('token', user.token);
      }
    })
  );
}

register(model: any){
  return this.http.post(this.baseUrl + 'register', model);
}

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}
