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
    debugger;
    console.log("Hi checking Model ", model);
    console.log("Hi checkingModel Id only ", model.id);
    //return this.http.delete(`${this.baseUrl}/${model.id}`,{ responseType: 'text' });
     return this.http.delete(this.baseUrl + 'DeleteImage/'+ model);
    //return this.http.delete(this.baseUrl + "/DeleteImage/DeleteImage?deleteImageID=" + 1);
    // '/api/auth/DeleteImage/DeleteImage?deleteImageID=' +1
    
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
}
