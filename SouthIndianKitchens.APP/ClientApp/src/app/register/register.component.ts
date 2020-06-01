import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  @ViewChild("LoginForm", { static: false }) newForm: NgForm;


  constructor(private authservice: AuthService, private alertifyjs: AlertifyService) { }

  ngOnInit() { }
  register() {
    this.authservice.register(this.model).subscribe(() => {
      this.alertifyjs.message('Register successfull');
    },
      (error) => {
        this.alertifyjs.error(error);
      }
    );
  }
  cancel() {
    this.cancelRegister.emit(false);
    console.log('canceled');
  }
}
