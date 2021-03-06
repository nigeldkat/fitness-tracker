import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';  //same as event emitter
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

//import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        //private snackBar: MatSnackBar,
        private uiService: UIService) { }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        });
    }

    regusterUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);
                //replaced with auth listiner
                //this.authSuccessfully();
            })
            .catch(error => {
                this.uiService.loadingStateChanged.next(false);
                // this.snackBar.open(error.message, null, {
                //     duration: 3000
                // });
                this.uiService.showSnackbar(error.message, null, 3000);
                //console.log('error message -', error);
            });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);
                //replaced with auth listiner
                //console.log(result);
                //this.authSuccessfully();
            })
            .catch(error => {
                this.uiService.loadingStateChanged.next(false);
                // this.snackBar.open(error.message, null, {
                //     duration: 3000
                // });
                this.uiService.showSnackbar(error.message, null, 3000);
                //console.log(error);
            })


    }

    logout() {
        this.afAuth.auth.signOut();
        // this.trainingService.cancelSubscriptions();
        // this.isAuthenticated = false;
        // this.authChange.next(false);
        // this.router.navigate(['/login']);
    }


    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccessfully() {
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        // this.router.navigate(['/training']);

    }

}