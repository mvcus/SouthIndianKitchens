import { Component, OnInit } from '@angular/core';
import { socialMediaLinks } from '../_Interfaces/socialMediaLinks.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

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
