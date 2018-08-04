
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
//import { AngularFirestoreModule } from 'angularfire2/firestore';
//import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AuthService } from './auth/auth.service';
import { TrainingService} from './training/training.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { UIService } from './shared/ui.service';
import{ environment } from '../environments/environment';

import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    MaterialModule, 
    AppRoutingModule, 
    FlexLayoutModule, 
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFirestoreModule,
    //AngularFireAuthModule,
    AuthModule,
    TrainingModule
  ],
  providers: [AuthService, TrainingService, UIService ],
  bootstrap: [AppComponent],
  //entryComponents: [StopTrainingComponent]
})
export class AppModule { }
