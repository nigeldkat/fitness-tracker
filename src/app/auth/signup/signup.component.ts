import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';  //for two way binding or template form

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate = new Date();
  constructor() { }

  ngOnInit() {
    let tempDate = new Date();
    this.maxDate.setFullYear(tempDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm){
    console.log(form);
  }

}
