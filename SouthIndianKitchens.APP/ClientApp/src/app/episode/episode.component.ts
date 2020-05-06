import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { VideoToCreate } from '../_Interfaces/VideoToCreate.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {
  public youtubeUrl = 'https://www.youtube.com/watch?v=idY-JhU25MQ';
   public allVideo = [];
  public allVideos: any[] = [];

  public videoToCreate: VideoToCreate;
  videoUrlCreate: string[];
  public productsArray: VideoToCreate[];

  private getVideosUrl = () => {
    this.http.get(this.authService.baseUrl + 'getVideoUrl')
      .subscribe(res => {
        this.videoUrlCreate = res as string[];
      });
  }

  ngOnInit(): void {
  }
  constructor(private authService: AuthService, private http: HttpClient) {
    this.getVideosUrl();
  }
  trackByFn(index, item) {
    return item.videoURL;
  }
 }

