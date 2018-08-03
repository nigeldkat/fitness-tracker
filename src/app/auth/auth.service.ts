import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';  //same as event emitter
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
//import { auth } from '../../../node_modules/firebase/app';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router,
        private afAuth: AngularFireAuth, private trainingService: TrainingService) { }

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
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                //replaced with auth listiner
                //this.authSuccessfully();
            })
            .catch(error => {
                console.log('error message -', error);
            });
    }

    login(authData: AuthData) {
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                //replaced with auth listiner
                //console.log(result);
                //this.authSuccessfully();
            })
            .catch(error => {
                console.log(error);
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