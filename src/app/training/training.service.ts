import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore,
        private uiService: UIService) { }

    public fetchAvailableExercises() {
        this.uiService.loadingStateChanged.next(true);
        this.fbSubs.push(
            this.db.collection('availableExercises')
                .snapshotChanges()
                .map(docArray => {
                    //throw( new Error())
                    return docArray.map(doc => {
                        return {
                            id: doc.payload.doc.id,
                            name: doc.payload.doc.data().name,
                            duration: doc.payload.doc.data().duration,
                            calories: doc.payload.doc.data().calories
                        };
                    });
                }).subscribe((exercises: Exercise[]) => {
                    this.uiService.loadingStateChanged.next(false);
                    this.availableExercises = exercises;
                    this.exercisesChanged.next([...this.availableExercises]);
                }, error => {
                    this.uiService.loadingStateChanged.next(false);
                    this.uiService.showSnackbar('Failure to load data, please try again later', null, 3000);
                    this.exercisesChanged.next(null);
                }));
        //return this.availableExercises.slice(); //this creates a copy
    }

    startExercise(selectedId: string) {
        //update last selected
        //this.db.doc(`availableExercises/` + selectedId).update({lastSelected: new Date()});
        this.runningExercise = this.availableExercises.find(ex => ex.id == selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    fetchCompletedOrCancelledExercises() {
        this.uiService.loadingStateChanged.next(true);
        this.fbSubs.push(
            this.db.collection(`finishedExercises`).valueChanges().subscribe(
                (exercises: Exercise[]) => {
                    this.finishedExercisesChanged.next(exercises);
                    this.uiService.loadingStateChanged.next(false);
                }
            ));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection(`finishedExercises`).add(exercise);
    }

}