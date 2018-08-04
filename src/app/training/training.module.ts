
import { NgModule } from '@angular/core';

//import { AngularFirestoreModule } from 'angularfire2/firestore';

import { SharedModule } from '../shared/shared.module';

import { CurrentTrainingComponent } from './current-training/current-training.component'
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component'
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent} from './training.component';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
    declarations: [
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent,
        TrainingComponent
    ],
    imports: [
        //AngularFirestoreModule,
        SharedModule,
        TrainingRoutingModule
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }