import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { userToCreate } from '../_Interfaces/userToCreate.model';
import { managedImages } from '../_Interfaces/manageImages.model';
import { environment } from '../../environments/environment';
import { ImageService } from '../_services/images.service';
import { HttpClient } from '@angular/common/http';
import { Key } from 'protractor';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  imageToShow: any;

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model: any = {};
  selectedFile: ImageSnippet;

  constructor(private authservice: AuthService, private imageService: ImageService, private httpClient: HttpClient) { }
  public userToCreate: userToCreate[] = [];
  public homeImages: managedImages;
  managedImages: string[];
  imagearr: string[];
  imageToShow: any;


  ngOnInit() {
    this.getImages();
    this.getHomeImages();
  }
  login() {
    this.authservice.login(this.model).subscribe(next => {
      console.log('logged in Successfully');
    }, error => {
      console.log('Failed to login');
    }
    );
  }
  getImages() {
    this.authservice.getImages().subscribe( res => {
        this.userToCreate = res as userToCreate[];
    })
  }

  getHomeImages() {
    this.authservice.getHomeImages().subscribe(res => {
      var result = res as unknown as string[];

      var a = [];
      // Loop over data
      for (var i = 0; i < result.length; i++) {
        if (result[i].startsWith("1")) {
          var str = result[i].toString();
          str = str.substring(str.indexOf("~~") + 2).toString();
          a.push(str);
        }
      }
      this.imagearr = a;
    })
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
