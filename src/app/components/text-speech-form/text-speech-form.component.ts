import { ITextSpeech } from './../../models/IText-Speech';
import { EventEmitter } from '@angular/core';
import { ITextSpeechResponse } from './../../models/protocols/IText-speech-response';
import { Validators } from '@angular/forms';
import { TextSpeechApiService } from './../../services/text-speech-api.service';
import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IVoice } from 'src/app/models/iVoice';
import { IOption } from './elements/select/select.component';

@Component({
  selector: 'app-text-speech-form',
  templateUrl: './text-speech-form.component.html',
  styleUrls: ['./text-speech-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextSpeechFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  voices: IVoice[] = [];
  vOptions: IOption[] = [];
  loading: boolean = false;
  _validators = Validators;
  playbackRate: number = 1;
  recordings: ITextSpeech[] = [];
  audio = new Audio();
  @Output() onTextSpeech: EventEmitter<ITextSpeech> = new EventEmitter();

  constructor(public txtSpch: TextSpeechApiService) { }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit() {
  }

  async init() {
    this.getVoices();
  }

  async getVoices() {
    this.voices = await this.txtSpch.getSpeechVoices();
    this.vOptions = this.voices.map((e, index) => {
      return { id: index, value: e.name, viewValue: e.name }
    })
  }

  async onPlay() {
    if (!this.isValidForm()) return;
    this.loading = true;
    try {
      let rslt = await this.txtSpch.getTextSpeech(this.form.value.text, this.form.value.voice)
      await this.onSuccess(rslt);
    } catch (error) {

    }
    this.loading = false;
  }

  isValidForm() {
    this.form.markAllAsTouched();
    let value = this.form.value;
    if (this.form.valid && !this.isDuplicate(value.text)) return true;
    return false;
  }

  async onSuccess(rslt: ITextSpeechResponse) {
    let fileUrl = window.URL.createObjectURL(rslt.file);
    this.recordings.push({ text: rslt.text, fileUrl, fileName: rslt.fileName,date:Date.now() });
    this.onTextSpeech.emit();
    await this.replayAudio(fileUrl);
  }

  async replayAudio(fileUrl: string) {
    if (this.audio) { this.audio.pause(); this.audio.remove(); }
    this.audio = new Audio(fileUrl)
    this.audio.playbackRate = this.playbackRate || 1;
    await this.audio.play();
  }

  deleteRecord(record:ITextSpeech){
    this.recordings = this.recordings.filter((e)=> record.fileName !== e.fileName)
  }

  isDuplicate(text: string) {
    let index = this.recordings.findIndex((e) => e.text == text);
    if (index == -1) return false;
    this.replayAudio(this.recordings[index].fileUrl);
    this.scrollToElement(this.recordings[index].fileName);
    return true;
  }

  scrollToElement(id: string) {
    let el = document.getElementById('record-'+id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      this.markAsFocused(el);
    }
  }

  markAsFocused(el:HTMLElement){
    el.style.border = '2px solid #3f51b5'
    setTimeout(() => {
     if(el) el.style.border = '0'
    }, 4000);
  }

}
