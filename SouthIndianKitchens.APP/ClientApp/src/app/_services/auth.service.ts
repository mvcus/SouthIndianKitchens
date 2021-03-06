import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';


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

  getImages() {
    return this.http.get(this.baseUrl + 'getImages');
  }
 
  getVideoUrl() {
    return this.http.get(this.baseUrl + 'getVideoUrl');
  }
  getSocialMediaLinks() {
    return this.http.get(this.baseUrl + 'getSocialMediaLinks');
  }
  sendEmail(model: any) {
    return this.http.post(this.baseUrl + 'SendEmail', model);
  }
  getMenuTitles() {
    return this.http.get(this.baseUrl + 'getMenuTitles');
  }
  getDropDownText(id, object) {
    const selObj = _.filter(object, function (o) {
      return (_.includes(id, o.id));
    });
    return selObj;
  }
  manageImages(model: any) {
    return this.http.post(this.baseUrl + 'manageImages', model);
  }
  getManageImages() {
    return this.http.get(this.baseUrl + 'getManageImages');
  }
  getHomeImages() {
    return this.http.get(this.baseUrl + 'getHomeImages');
  }

}
