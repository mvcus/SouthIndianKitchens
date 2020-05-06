import { userToCreate } from '../_Interfaces/userToCreate.model';
import { User } from '../_Interfaces/user.model';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { VideoToCreate } from '../_Interfaces/VideoToCreate.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  public isCreate: boolean;
  public isCreate1: boolean;
  public name: string;
  public address: string;
  public imgPath: string;
  public videoName: string;
  public videoUrl: string;
  public isActive: boolean;
  public user: userToCreate;
  public videoToCreate: VideoToCreate;
  userToCreate: string[];
  videoUrlCreate: string[];

  public response: { dbPath: '' };
  public uploadFinished = (event) => {
    this.response = event;
  }
  public createImgPath = (serverPath: string) => {
    return this.authservice.baseUrl+'/${serverPath}';
  }
  constructor(private http: HttpClient, private authservice: AuthService, private alertifyjs: AlertifyService) { }

  ngOnInit() {
    this.getImages();
    this.getVideosUrl();
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(this.authservice.baseUrl + 'Upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
        this.imgPath = "Resources/Images/" + fileToUpload.name;
      });
  }
  public onCreate = () => {
    this.user = {
      name: this.name,
      address: this.address,
      imgPath: this.imgPath,
    }

    this.http.post(this.authservice.baseUrl + 'SavePath', this.user )
      .subscribe(res => {
        this.getImages();
        this.isCreate = false;
        this.alertifyjs.message("Image saved Successfully");
      });
  }

  private getImages = () => {
    this.http.get(this.authservice.baseUrl + 'getImages')
      .subscribe(res => {
        this.userToCreate = res as string[];
      });
  }


  private getVideosUrl = () => {
    this.http.get(this.authservice.baseUrl + 'getVideoUrl')
      .subscribe(res => {
        this.videoUrlCreate = res as string[];
      });
  }

  public returnToCreate = () => {
    this.isCreate = true;
    this.name = '';
    this.address = '';
  }

  public returnToVideosCreate = () => {
    this.isCreate1 = true;
    this.videoName = '';
    this.videoUrl = '';
    this.isActive = false;
  }

  public onVideoCreate = () => {
    this.videoToCreate = {
      videoName: this.videoName,
      videoURL: this.videoUrl,
      isActive: this.isActive = "true" ? true : false,
    }

    this.http.post(this.authservice.baseUrl + 'SaveVideoUrl', this.videoToCreate)
      .subscribe(res => {
        this.getImages();
        this.isCreate1 = false;
        this.alertifyjs.message("Video URL saved Successfully");
      });
  }
  templateForm(value: any) {
    this.videoToCreate = {
      videoName: this.videoName,
      videoURL: this.videoUrl,
      isActive: this.isActive = "true" ? true : false,
    }
    alert(JSON.stringify(value));
    this.http.post(this.authservice.baseUrl + 'SaveVideoUrl', this.videoToCreate)
      .subscribe(res => {
        this.getImages();
        this.isCreate1 = false;
        this.alertifyjs.message("Video URL saved Successfully");
      });
  }
}
