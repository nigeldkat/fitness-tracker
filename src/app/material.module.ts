import { NgModule }  from '@angular/core';

import { MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    imports:[
        MatButtonModule, 
        MatCheckboxModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatInputModule ],
    exports: [
        MatButtonModule, 
        MatCheckboxModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatInputModule]
})
export class MaterialModule{}