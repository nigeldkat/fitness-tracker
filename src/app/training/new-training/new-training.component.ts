import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';  //for two way binding or template form

import { AngularFirestore } from 'angularfire2/firestore';
//import { Obserable } from 'rxjs'
//import { Subject } from 'rxjs/Subject';
//import { Obserable } from 'rxjs';


import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
//for initial
  //exercises: Exercise[] = [];
  exercises: Observable<any>;
  

//, private db: AngularFirestore
  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit() {

    //without subscription
    this.exercises = this.db.collection('availableExercises').valueChanges();

//let x = this.db.collection('availableExercises').valueChanges();



    //valueChanges strips off meta data
    this.db.collection('availableExercises').valueChanges()
    .subscribe(result =>{
      console.log('my results', result)
    })
    //old
    //this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
