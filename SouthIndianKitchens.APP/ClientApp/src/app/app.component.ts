
import { userToCreate } from './_Interfaces/userToCreate.model';
import { User } from './_Interfaces/user.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart  } from "@angular/router";


@Component({
  selector: 'app-root',
  template: '<app-header></app-header><router-outlet></router-outlet><app-footer></app-footer>',
  //template: '<app-header *ngIf="showHead"></app-header><router-outlet></router-outlet><app-footer *ngIf="showFoot"></app-footer>',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'South Indians Kitchens';
  public isCreate: boolean;
  public name: string;
  public address: string;
  public user: userToCreate;
  public users: User[] = [];
  showHead: boolean = false;
  showFoot: boolean = false;

  constructor(private http: HttpClient, public router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showHead = false;
          this.showFoot = false;
        } else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });
  }

  ngOnInit() {
    this.isCreate = true;
  }

  public onCreate = () => {
    this.user = {
      name: this.name,
      address: this.address,
      imgPath: ''
    }

    this.http.post('https://localhost:5001/api/users', this.user)
      .subscribe(res => {
        this.getUsers();
        this.isCreate = false;
      });
  }

  private getUsers = () => {
    this.http.get('https://localhost:5001/api/users')
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
