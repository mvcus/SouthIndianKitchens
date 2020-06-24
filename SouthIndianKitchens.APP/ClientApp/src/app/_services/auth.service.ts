import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

baseUrl = '/api/auth/';

  constructor(private http: HttpClient) {   }

login(model: any)
{

  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
            localStorage.setItem('token', user.token);
      }
    })
  );
}
  onUpdateImage(model: any) {   
    return this.http.put(this.baseUrl + 'EditImage', model);
  }
  onDeleteImage(model: any) {
    return this.http.delete(this.baseUrl + 'DeleteImage/' + model);
  }

  onUpdateVideo(model: any) {
    return this.http.put(this.baseUrl + 'EditVideo', model);
  }

  onDeleteVideo(model: any) {
    return this.http.delete(this.baseUrl + 'DeleteVideo/' + model);
  }
  
  register(model: any) {
    debugger;
  return this.http.post(this.baseUrl + 'register', model);
  }
  emailsubscribe(model: any) {
    return this.http.post(this.baseUrl + '', model);
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

  getImages() {
    return this.http.get(this.baseUrl + 'getImages');
  }

  getVideoUrl() {
    return this.http.get(this.baseUrl + 'getVideoUrl');
  }
  getSocialMediaLinks() {
    return this.http.get(this.baseUrl + 'getSocialMediaLinks');
  }
}
