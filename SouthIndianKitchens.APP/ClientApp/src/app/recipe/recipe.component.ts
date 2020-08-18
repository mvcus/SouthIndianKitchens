import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ImageService } from './image.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
declare const myTest: any;


@Component({
  selector: 'app-recpiegallary',
  templateUrl: './recpie.component.html',
  styleUrls: ['./recpie.component.css']
})

export class RecipeComponent implements OnChanges {
  image: any[];
  filterBy?: string = 'all';
  allImages: any[] = [];
  recipePath = null;
  showModal: boolean;
  imagearr: string[];

  ngOnInit() {
    this.getHomeImages();
  }

  show() {
    this.showModal = true; // Show-Hide Modal Check

  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }

  constructor(private authservice: AuthService, private imageService: ImageService, private httpClient: HttpClient) {
    this.allImages = this.imageService.getImages();
  }
  ngOnChanges() {
    this.allImages = this.imageService.getImages();

  }
  //public myfunction(message: string) {
  //  alert(message);
  //}

  onClick(recipePath) {
    this.recipePath = recipePath;
  }

  getHomeImages() {
    this.authservice.getHomeImages().subscribe(res => {
      var result = res as unknown as string[];

      var a = [];
      // Loop over data
      for (var i = 0; i < result.length; i++) {
        if (result[i].startsWith("2")) {
          var str = result[i].toString();
          str = str.substring(str.indexOf("~~") + 2).toString();
          a.push(str);
        }
      }
      this.imagearr = a;
    })
  }
}
