import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextSpeechFormComponent } from './text-speech-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { SelectComponent } from './elements/select/select.component';
import { TextAreaComponent } from './elements/text-area/text-area.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    TextSpeechFormComponent,
    SelectComponent,
    TextAreaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    TextSpeechFormComponent
  ]
})
export class TextSpeechFormModule { }
