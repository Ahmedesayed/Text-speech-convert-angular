import { IVoice } from './../models/iVoice';
import { IVoices } from './../models/protocols/IVoices';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { DEFAULT_VOICE } from '../constant/synthesize';
import { ITextSpeechResponse } from '../models/protocols/IText-speech-response';

@Injectable({
  providedIn: 'root'
})

export class TextSpeechApiService {

  constructor(private api: ApiService) { }

  getTextSpeech(text: string,voice ?:string) {
    let fileName = Date.now().toString();
    return this.api.postRfile(`synthesize?voice=${voice ? voice : DEFAULT_VOICE}`,{text}).pipe(tap((e)=>{
      if(e) saveAs(e,fileName);
    }),map((e)=>{
      let rslt : ITextSpeechResponse = {text,fileName:fileName+'.wav',file:e} 
      return rslt
    })).toPromise(); 
  }

  getSpeechVoices() {
    return this.api.get<IVoices>('voices').pipe(map((e)=>e.voices)).toPromise();
  }


}
