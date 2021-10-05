import { StorageService } from './../../services/storage.service';
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

  constructor(private storageService:StorageService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.recordings = this.storageService.getRecordings();
  }

  addToList(){
    if(this.textSpeechForm?.recordings){
      this.recordings.push.apply(this.recordings,this.textSpeechForm.recordings) 
      this.storageService.saveRecordings(this.recordings);
    }
  }

  deleteItem(index:number){
    this.recordings.splice(index,1);
  }

}
