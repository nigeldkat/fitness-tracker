import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();

  training = [
    {name: 'sit ups'},
    {name: 'pull ups'},
    {name: 'puking'},
    {name: 'drinking shots'}
  ];
  constructor() { }

  ngOnInit() {
  }

  onStartTraining(){
    this.trainingStart.emit();
  }

}
