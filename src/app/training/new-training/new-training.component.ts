import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';  //for two way binding or template form

//import { AngularFirestore } from 'angularfire2/firestore';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  //for initial
  //exercises: Exercise[] = [];
  //exercises: Observable<any>; -- for valuechanges
  //exercises: Observable<Exercise[]>;  //for snapshot
  //for subscription
  exercises: Exercise[] ;
  exerciseSubscription: Subscription;

  isLoading: boolean = false;
  private loadingSubs: Subscription;

  //, private db: AngularFirestore
  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe( 
      isLoading => {
        if(isLoading){
          this.isLoading = true;
        } else {
          this.isLoading = false;
        }
      });

    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.trainingService.fetchAvailableExercises();
    this.fetchExercises();

    //without subscription using valuechanges
    //this.exercises = this.db.collection('availableExercises').valueChanges();


    //with mappig
    // this.exercises =
    //   this.db.collection('availableExercises')
    //     .snapshotChanges()
    //     .map(docArray => {
    //       return docArray.map(doc => {
    //         return {
    //           id: doc.payload.doc.id,
    //           name: doc.payload.doc.data().name,
    //           duration: doc.payload.doc.data().duration,
    //           calories: doc.payload.doc.data().calories
    //         };
    //       });
    //     });


    //valueChanges strips off meta data
    // this.db.collection('availableExercises').valueChanges()
    // .subscribe(result =>{
    //   console.log('my results', result)
    // })

    // //sanpshotChanges gets meta data but no data
    // this.db.collection('availableExercises').snapshotChanges()
    // .subscribe(result =>{
    //   console.log('my results', result)
    // })

    //sanpshotChanges using payload
    // this.db.collection('availableExercises').snapshotChanges()
    // .subscribe(result =>{
    //   for (const res of result){
    //     console.log('my res.payload.data ', res.payload.doc.data())
    //   }

    // })

    // //mapping to doc object
    // this.db.collection('availableExercises')
    // .snapshotChanges()
    // .map( docArray => {
    //   return docArray.map( doc =>{
    //     return {
    //       id: doc.payload.doc.id,
    //       ...doc.payload.doc.data()
    //     };
    //   });
    // })
    // .subscribe(result =>{
    //   console.log('my results', result);      
    // })

    //old
    //this.exercises = this.trainingService.getAvailableExercises();
  }

  private fetchExercises(){
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(){
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
    if(this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }   
    
  }

  fetchAgain(){
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
