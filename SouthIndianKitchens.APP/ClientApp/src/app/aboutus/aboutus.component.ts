import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { socialMediaLinks } from '../_Interfaces/socialMediaLinks.model';


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})




export class AboutusComponent implements OnInit {

  public medialinks: socialMediaLinks;
  socialMediaLinks: string[];

  constructor(private http: HttpClient, private authservice: AuthService, private alertifyjs: AlertifyService) { }

  ngOnInit() {
    this.getSocialMediaLinks();
  }
  private getSocialMediaLinks = () => {
    this.http.get(this.authservice.baseUrl + 'getSocialMediaLinks')
      .subscribe(res => {
        this.socialMediaLinks = res as string[];
      });
  }
}
