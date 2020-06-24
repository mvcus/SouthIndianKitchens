import { AuthService } from './../_services/auth.service';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, NgForm } from '@angular/forms';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  //@Output() cancelSubscribe = new EventEmitter();
  model: any = {};
  constructor(private authservice: AuthService, private alertifyjs: AlertifyService) { }
  ngOnInit() { }
  Emailsubscribe() {
    this.authservice.emailsubscribe(this.model).subscribe(() => {
      this.alertifyjs.message('News Letter Subscription Successful');
    },
      (error) => {
        this.alertifyjs.error(error);
      }
    );
  }
  
}
