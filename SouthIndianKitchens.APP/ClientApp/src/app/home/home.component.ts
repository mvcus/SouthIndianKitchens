import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { userToCreate } from '../_Interfaces/userToCreate.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model: any = {};
  constructor(private authservice: AuthService) { }
  public userToCreate: userToCreate[] = [];
  ngOnInit() {
    this.getImages();
  }
  login() {
    this.authservice.login(this.model).subscribe(next => {
      console.log('logged in Successfully');
    }, error => {
      console.log('Failed to login');
    }
    );
  }
  getImages() {
    this.authservice.getImages().subscribe( res => {
        this.userToCreate = res as userToCreate[];
    })
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}
