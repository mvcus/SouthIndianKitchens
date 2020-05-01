import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imageslider',
  templateUrl: './imageslider.component.html',
  styleUrls: ['./imageslider.component.css']
})
export class ImageSliderComponent implements OnInit {

  imageObject: Array<object> = [{
    video: 'https://www.youtube.com/embed/Q_g-bD5lgx8',
    title: 'Thavala Adai Idli',
    alt: 'idli Recipe'
  }, {
      video: 'https://www.youtube.com/embed/M5WLK3C4ouA',
      title: 'Paper Dosa',
      alt: 'Paper Dosa'
  }, {
      video: 'https://www.youtube.com/embed/KjPiSvMJu6I',
      title: 'Onion Chutney',
      alt: 'Onion Chutney'
  }, {
      video: 'https://www.youtube.com/embed/Ud_EPPb1m40',
      title: 'Bajra Dosa',
      alt: 'Bajra Dosa'
  }, {
      video: 'https://www.youtube.com/embed/CiPm_918kpE',
      title: 'Curry',
      alt: 'Curry'
  }, {
      video: 'https://www.youtube.com/embed/W8vTu_5ZM-I',
      title: 'Pudina Pulav',
      alt: 'Pudina Pulav'
  }, {
      video: 'https://www.youtube.com/embed/T1B305Mgxd8',
      title: 'Idli Recipe1',
      alt: 'Idli Recipe'
  }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
