import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // @Input() valueFromHome: any;
  registerForm: FormGroup;
  submitted: false;


  @ViewChild("LoginForm", { static: false }) newForm: NgForm;

  @Output() cancelLogin = new EventEmitter();
  model: any = {};
  constructor(private authservice: AuthService, private route: Router, private alertifyjs: AlertifyService) { }

  ngOnInit() {

  }

  login() {
    if (this.newForm.valid) {
      this.authservice.login(this.model).subscribe(next => {
        this.alertifyjs.success('logged in Successfully');
      }, error => {
        this.alertifyjs.error('Failed to login');
      }, () => {
          this.route.navigate(['\manage']);
      }
      );
    }
    else {
      //Show your error code
    }
  }



  cancel() {
    this.route.navigate(['\Home']);
    this.cancelLogin.emit(false);
  }
}
