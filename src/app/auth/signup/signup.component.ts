import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';  //for two way binding or template form

import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate = new Date();
  constructor(private authService: AuthService) { }

  ngOnInit() {
    let tempDate = new Date();
    this.maxDate.setFullYear(tempDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm){
    this.authService.regusterUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
