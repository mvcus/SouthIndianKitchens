import { Component, OnInit,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import { socialMediaLinks } from '../_Interfaces/socialMediaLinks.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public medialinks: socialMediaLinks;
  socialMediaLinks: string[];
  name: string = "";
  model: any = {};
  @ViewChild("sendEmailForm", { static: false }) newForm: NgForm;

  constructor(private http: HttpClient, private authservice: AuthService, private alertifyjs: AlertifyService /*, private formBuilder: FormBuilder*/) { }

  ngOnInit() {
    this.getSocialMediaLinks();    
  }

  

  private getSocialMediaLinks = () => {
    this.http.get(this.authservice.baseUrl + 'getSocialMediaLinks')
      .subscribe(res => {
        this.socialMediaLinks = res as string[];
      });
  }

  sendEmail() {
    if (this.name != null) {
      this.authservice.sendEmail(this.model).subscribe(() => {
        this.alertifyjs.success('Successfully subscribed');
        //alert('SUCCESS!!');
      },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      alert('Please provide the vali email address');
      //this.alertifyjs.message('Please provide the vali email address');
    }
  }
}
