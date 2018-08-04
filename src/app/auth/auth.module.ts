
import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AngularFireAuthModule } from 'angularfire2/auth';

//import { MaterialModule } from '../material.module';
//import { FlexLayoutModule} from '@angular/flex-layout';

import { LoginComponent} from './login/login.component';
import { SignupComponent} from './signup/signup.component';

import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        //CommonModule,
        // FormsModule, 
        // ReactiveFormsModule,
        // MaterialModule, 
        // FlexLayoutModule,
        AngularFireAuthModule,
        SharedModule
    ],
    exports: [

    ]
})
export class AuthModule { }