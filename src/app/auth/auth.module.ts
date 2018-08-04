
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule} from '@angular/flex-layout';

import { LoginComponent} from './login/login.component';
import { SignupComponent} from './signup/signup.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        MaterialModule, 
        FlexLayoutModule
    ],
    exports: [

    ]
})
export class AuthModule { }