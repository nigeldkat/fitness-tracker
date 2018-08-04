import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm} from '@angular/forms';  //for two way binding or template form
import { Subscription} from 'rxjs';

import { AuthService } from '../auth.service'; 
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private loadingSubs: Subscription;

  maxDate = new Date();
  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe( 
      isLoading => {
        if(isLoading){
          this.isLoading = true;
        } else {
          this.isLoading = false;
        }
      });
    let tempDate = new Date();
    this.maxDate.setFullYear(tempDate.getFullYear() - 18);
  }

  ngOnDestroy(){
    if(this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }
  }

  onSubmit(form: NgForm){
    this.authService.regusterUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
