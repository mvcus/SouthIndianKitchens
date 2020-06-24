import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ImageService } from './image.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-recpiegallary',
  templateUrl: './recpie.component.html',
  styleUrls: ['./recpie.component.css']
})

export class RecpieComponent implements OnChanges {
  image: any[];
  filterBy?: string = 'all';
  allImages: any[] = [];

  showModal: boolean;
  show() {
    this.showModal = true; // Show-Hide Modal Check

  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }

  constructor(private imageService: ImageService, private http: HttpClient) {
    this.allImages = this.imageService.getImages();
  }
  ngOnChanges() {
    this.allImages = this.imageService.getImages();

  }
  //public myfunction(message: string) {
  //  alert(message);
  //}
}
