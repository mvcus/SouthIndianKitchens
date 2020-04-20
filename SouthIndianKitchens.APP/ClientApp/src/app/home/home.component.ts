import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  values: any;
  registerMode = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {

}
  registerToggled(){

    this.registerMode = true;

  }
  // getValues(){//this.getValues();
  //   this.http.get('http://localhost:5000/api/values').subscribe(response => {
  //   this.values = response;
  //   }, error => {
  //     console.log(error);
  //   });
  // }
  cancelRegisterMode(registerMode: boolean)
  {
    this.registerMode = registerMode;
  }
}
