import { userToCreate } from '../_Interfaces/userToCreate.model';
import { User } from '../_Interfaces/user.model';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  public isCreate: boolean ;
  public name: string;
  public address: string;
  public imgPath: string;
  public user: userToCreate;
  public users: User[] = [];

  public response: { dbPath: '' };
  public uploadFinished = (event) => {
    this.response = event;
  }
  public createImgPath = (serverPath: string) => {
    return this.authservice.baseUrl+'/${serverPath}';
  }
  constructor(private http: HttpClient, private authservice: AuthService) { }

  ngOnInit() {
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
        this.imgPath = "Resources/Imgages/" + fileToUpload.name;
      });
  }
  public onCreate = () => {
    this.user = {
      name: this.name,
      address: this.address,
      imgPath: this.imgPath, //this.response.dbPath
    }

    this.http.post(this.authservice.baseUrl + 'SavePath', this.user )
      .subscribe(res => {
        this.getImages();
        this.isCreate = false;

      });
  }
  //private getUsers = () => {
  //  this.http.get(this.authservice.baseUrl +'users')
  //    .subscribe(res => {
  //      this.users = res as User[];
  //    });
  //}
  private getImages = () => {
    this.http.get(this.authservice.baseUrl + 'getImages')
      .subscribe(res => {
        this.users = res as User[];
      });
  }

  public returnToCreate = () => {
    this.isCreate = true;
    this.name = '';
    this.address = '';
  }

}
