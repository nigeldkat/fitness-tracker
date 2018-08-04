
import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { FormsModule} from '@angular/forms'; //, ReactiveFormsModule

import { AngularFirestoreModule } from 'angularfire2/firestore';

//import { MaterialModule } from '../material.module';
//import { FlexLayoutModule} from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';

import { CurrentTrainingComponent } from './current-training/current-training.component'
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component'
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent} from './training.component';

@NgModule({
    declarations: [
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent,
        TrainingComponent
    ],
    imports: [
        //CommonModule,
        //FormsModule, 
        // ReactiveFormsModule,
        //MaterialModule, 
        //FlexLayoutModule,
        AngularFirestoreModule,
        SharedModule
    ],
    exports: [
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }