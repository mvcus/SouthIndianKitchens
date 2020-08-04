import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormGroup, FormBuilder, FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { menuList } from '../_Interfaces/menuList.model';
import { Observable } from 'rxjs';
import { managedImages } from '../_Interfaces/manageImages.model';

@Component({
  selector: 'app-manageimage',
  templateUrl: './manageimages.component.html',
  styleUrls: ['./manageimages.component.css']
})
export class ManageImagesComponent implements OnInit {


  public menuTitle: menuList;
  menuList: string[];

  sampleform: FormGroup;
  errorMessage: string;

  TitleId: 0;
  IsBanner: boolean;

  ImagePath: string;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  model: any = {};
  public imagesToManage: managedImages;
  managedImages: string[];

  images = [];
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  public response: { dbPath: '' };
  public uploadFinished = (event) => {
    this.response = event;
  }

  constructor(private http: HttpClient, private authservice: AuthService, fb: FormBuilder) {
    this.sampleform = fb.group({
      'Id': 0 // will use the property in html page  
    });
  }
  ngOnInit() {
    this.getMenuTitles();
    this.getManageImages();
  }

  private getManageImages = () => {
    this.http.get(this.authservice.baseUrl + 'getManageImages')
      .subscribe(res => {
        this.managedImages = res as string[];
      });
  }

  private getMenuTitles = () => {
    this.http.get(this.authservice.baseUrl + 'getMenuTitles')
      .subscribe(res => {
        this.menuList = res as string[];
      });
  };
  selectChange() {
    this.authservice.getDropDownText(this.TitleId, this.menuList)[0].id;
  }
  onItemChange(value) {
    this.IsBanner = value;
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
        this.ImagePath = "Resources/Images/" + fileToUpload.name;
        //this.ImagePath =  fileToUpload.name;
      });
  }
  manageImages() {
    this.authservice.manageImages(this.model).subscribe(() => {
    this.getManageImages();
      alert('Success');
    },
      (error) => {
        alert(error);
      }
    );
  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);

          this.myForm.patchValue({
            fileSource: this.images
          });
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  submit() {
    console.log(this.myForm.value);
    this.http.post('http://localhost:8001/upload.php', this.myForm.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }
}
