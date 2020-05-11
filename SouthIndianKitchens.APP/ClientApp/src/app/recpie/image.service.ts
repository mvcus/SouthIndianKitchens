import { Injectable } from '@angular/core'
@Injectable()
export class ImageService {
  allImages = [];

  getImages() {
    return this.allImages = Imagedetails.slice(0);
  }

  getImage(id: number) {
    return Imagedetails.slice(0).find(Images => Images.id == id)
  }
}    

const Imagedetails = [
  { "id": 1, "Time": "Breakfast", "url":"/bf1.jpg" },
  { "id": 2, "Time": "Launch", "url":"/bf2.jpg" },
  { "id": 3, "Time": "Dinner", "url": "/bf3.jpg" },
  { "id": 4, "Time": "Breakfast", "url": "/bf4.jpg" },
  { "id": 5, "Time": "Launch", "url": "/bf5.jpg" },
  { "id": 6, "Time": "Dinner", "url": "/bf6.jpg" },
  { "id": 7, "Time": "Breakfast", "url": "/bf7.jpg" },
  { "id": 8, "Time": "Launch", "url": "/bf8.jpg" },
  { "id": 9, "Time": "Dinner", "url": "/bf9.jpg" },
]
