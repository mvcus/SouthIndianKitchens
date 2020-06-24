import { userToCreate } from '../_Interfaces/userToCreate.model';
import { User } from '../_Interfaces/user.model';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { VideoToCreate } from '../_Interfaces/VideoToCreate.model';
import { FormsModule } from '@angular/forms';
import { editImageList } from '../Upload/editImageList';
import { deleteImageDetails } from '../Upload/delteImageDetails';
import { delteVideoDetails } from '../Upload/deleteVideoDetails';
import { imageToDelete } from '../_Interfaces/imageToDelete';
import { error } from 'protractor';
import { editVideoList } from './editVideoList';

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
  //public image: imageToDelete;
  public videoToCreate: VideoToCreate;
  userToCreate: string[];
  videoUrlCreate: string[];
  imageToDelete: string[];

  editIndex: number = null;
  editImageDetails: editImageList = new editImageList();
  deleteImageDetails: deleteImageDetails = new deleteImageDetails();

  editVideoDetails: editVideoList = new editVideoList();
  deleteVideoDetails: delteVideoDetails = new delteVideoDetails();



  public response: { dbPath: '' };
  public uploadFinished = (event) => {
    this.response = event;
  }
  public createImgPath = (serverPath: string) => {
    return this.authservice.baseUrl + '/${serverPath}';
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


    this.http.post(this.authservice.baseUrl + 'SavePath', this.user)
      .subscribe(res => {
        this.getImages();
        this.isCreate = false;
        this.alertifyjs.message("Image saved Successfully");
      });
  }
  public onEditImage(event, index) {
    this.editImageDetails.id = this.userToCreate[index]['id'];
    this.editImageDetails.name = this.userToCreate[index]['name'];
    this.editImageDetails.address = this.userToCreate[index]['address'];
    this.editIndex = index;

  }

  public onDeleteClick(event, index) {
    this.deleteImageDetails.id = this.userToCreate[index]['id'];
    this.deleteImageDetails.name = this.userToCreate[index]['name'];
    this.deleteImageDetails.address = this.userToCreate[index]['address'];
    this.editIndex = index;
  }

  public onDeleteConfirmClick() {
    return this.authservice.onDeleteImage(this.deleteImageDetails.id).subscribe(
      (response) => {
        this.deleteImageDetails.id = null;
        this.deleteImageDetails.name = null;
        this.deleteImageDetails.address = null;
        this.deleteImageDetails.imgPath = null;
        this.getImages();
      }
    );
  }



  // Delete and Edit Command for Videos ///
  public onEditVideo(event, index) {
    this.editVideoDetails.id = this.videoUrlCreate[index]['id'];
    this.editVideoDetails.videoName = this.videoUrlCreate[index]['videoName'];
    this.editVideoDetails.videoURL = this.videoUrlCreate[index]['videoURL'];
    this.editIndex = index;
  }

  public onDeleteVideoClick(event, index) {
    this.deleteVideoDetails.id = this.videoUrlCreate[index]['id'];
   // this.editVideoDetails.videoName = this.videoUrlCreate[index]['videoName'];
   // this.editVideoDetails.videoURL = this.videoUrlCreate[index]['videoURL'];
    this.editIndex = index;
  }

  public onDeleteVideoConfirmClick() {
    return this.authservice.onDeleteVideo(this.deleteVideoDetails.id).subscribe(
      (response) => {
        this.deleteVideoDetails.id = null;
        this.deleteVideoDetails.videoName = null;
        this.deleteVideoDetails.videoURL = null;
        this.deleteVideoDetails.isActive = null;
        this.getVideosUrl();
      }
    );
  }

  onUpdateVideo() {
    return this.authservice.onUpdateVideo(this.editVideoDetails).subscribe(
      (response: VideoToCreate) => {
        this.getVideosUrl();
      },
      (error) => {
        console.log("TS error is ", error);
      }
    );

  }

  onUpdateImage() {
    return this.authservice.onUpdateImage(this.editImageDetails).subscribe(
      (response: userToCreate) => {
        this.getImages();
      },
      (error) => {
        console.log("TS error is ", error);
      }
    );

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
          this.getVideosUrl();
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
    this.http.post(this.authservice.baseUrl + 'SaveVideoUrl', this.videoToCreate)
      .subscribe(res => {
        this.getImages();
        this.isCreate1 = false;
        this.alertifyjs.message("Video URL saved Successfully");
      });
  }
}
