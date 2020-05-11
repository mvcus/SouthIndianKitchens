import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class UploadImageService {

  baseUrl = 'http://localhost:15050/api/values/';
  constructor(private http: HttpClient) { }

  postFile(formValue: any, fileToUpload: any) {
    console.log('fileToUpload', fileToUpload);
    console.log('formValue', formValue);
    const endpoint = this.baseUrl + 'UploadImage'; /*'http://localhost:28101/api/UploadImage';*/
    const formData: FormData = new FormData();
    formData.append('ImgPath', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', fileToUpload.name);
    formData.append('Name', formValue.Name);
    formData.append('Address', formValue.Address);
    return this.http
      .post(endpoint, formData);
  }

}
