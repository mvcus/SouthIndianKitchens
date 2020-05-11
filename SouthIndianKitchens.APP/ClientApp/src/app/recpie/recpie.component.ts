import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ImageService } from './image.service';


@Component({
  selector: 'app-recpiegallary',
  templateUrl: './recpie.component.html',
  styleUrls: ['./recpie.component.css']
})

export class RecpieComponent implements OnChanges {
  image: any[];
  filterBy?: string = 'all';
  allImages: any[] = [];

  constructor(private imageService: ImageService) {
    this.allImages = this.imageService.getImages();
  }
  ngOnChanges() {
    this.allImages = this.imageService.getImages();

  }
}
