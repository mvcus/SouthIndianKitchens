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
  { "id": 2, "Time": "Breakfast", "url":"/bf2.jpg" },
  { "id": 3, "Time": "Breakfast", "url": "/bf3.jpg" },
  { "id": 4, "Time": "Breakfast", "url": "/bf4.jpg" },
  { "id": 5, "Time": "Launch", "url": "/bf5.jpg" },
  { "id": 6, "Time": "Launch", "url": "/bf6.jpg" },
  { "id": 7, "Time": "Launch", "url": "/bf7.jpg" },
  { "id": 8, "Time": "Launch", "url": "/bf8.jpg" },
  { "id": 9, "Time": "Launch", "url": "/bf9.jpg" },
  { "id": 10, "Time": "FastFood", "url": "/bf10.jpg" },
  { "id": 11, "Time": "FastFood", "url": "/bf11.jpg" },
  { "id": 12, "Time": "FastFood", "url": "/bf12.jpg" },
  { "id": 13, "Time": "FastFood", "url": "/bf13.jpg" },
  { "id": 14, "Time": "Dinner", "url": "/bf14.jpg" },
  { "id": 15, "Time": "Dinner", "url": "/bf15.jpg" },
  { "id": 16, "Time": "Dinner", "url": "/bf16.jpg" },
  { "id": 17, "Time": "Dinner", "url": "/bf17.jpg" },
]
