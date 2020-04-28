import { Component, OnInit, Injectable } from '@angular/core';
const Videodelatils: any[] = [
  { embedUrl: 'https://www.youtube.com/embed/', id: 'tvd5nuee-Ak' },
  { embedUrl: 'https://www.youtube.com/embed/', id: 'Zjm9fQBBHiM' },
  { embedUrl: 'https://www.youtube.com/embed/', id: '-yOnhM3fYpw' },
  { embedUrl: 'https://www.youtube.com/embed/', id: '6dJgbUZhUQo' },
  { embedUrl: 'https://www.youtube.com/embed/', id: 'Q_g-bD5lgx8' },
  { embedUrl: 'https://www.youtube.com/embed/', id: 'M5WLK3C4ouA' },
  { embedUrl: 'https://www.youtube.com/embed/', id: 'KjPiSvMJu6I' },
  { embedUrl: 'https://www.youtube.com/embed/', id: 'Ud_EPPb1m40' },
  { embedUrl: 'https://www.youtube.com/embed/', id: 'CiPm_918kpE' },
  { embedUrl: 'https://www.youtube.com/embed/', id: '04WuV8oznS4' },
  { embedUrl: 'https://www.youtube.com/embed/', id: 'W8vTu_5ZM-I' },
  { embedUrl: 'https://www.youtube.com/embed/', id: 'T1B305Mgxd8' },
 ];
@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {
  public youtubeUrl = 'https://www.youtube.com/watch?v=idY-JhU25MQ';
   public allVideo = [];
   public allVideos: any[] = [];
   getImages() {
    return this.allVideo = Videodelatils; // .slice(0);
   }
  ngOnInit(): void {
  }
  constructor() {
    this.allVideos = this.getImages();
  }
  trackByFn(index, item) {
    return item.id;
  }
 }

