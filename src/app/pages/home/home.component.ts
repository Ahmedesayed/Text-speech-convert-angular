import { TextSpeechFormComponent } from './../../components/text-speech-form/text-speech-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ITextSpeech } from 'src/app/models/IText-Speech';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recordings: ITextSpeech[] = [];
  @ViewChild(TextSpeechFormComponent,{}) textSpeechForm : TextSpeechFormComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  addToList(){
    this.recordings = this.textSpeechForm?.recordings || [];
  }

}
