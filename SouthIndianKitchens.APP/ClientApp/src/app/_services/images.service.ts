import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  baseUrl = '/api/auth/';

  constructor(private http: HttpClient, private authservice: AuthService) { }

  getMenuTitles() {
    return this.http.get(this.baseUrl + 'getMenuTitles');
  }
}
