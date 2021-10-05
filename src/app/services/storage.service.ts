import { ITextSpeech } from 'src/app/models/IText-Speech';
import { RECORDING_LIST } from './../constant/synthesize';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async saveRecordings(data : ITextSpeech[]){
    let dataToSave = await Promise.all( data.map(async(e)=>{
      e.fileData = await this.blobToDataURL(e.fileData as Blob) as string;
      return e;
    }))
    if(dataToSave.length)
    localStorage.setItem(RECORDING_LIST,JSON.stringify(data));
  }

  blobToDataURL(blob:Blob) {
    var a = new FileReader();
    return new Promise<string>((resolve,reject)=>{
      a.onload = function(e) { if(e && e.target) resolve(e.target.result as string)}
      a.onerror = function(err) { reject(err) }
      a.readAsDataURL(blob);
    })
 }

  getRecordings() : ITextSpeech[]{
    let data : ITextSpeech[] = [];
    try {
      data = JSON.parse(localStorage[RECORDING_LIST])
      data.forEach((e)=>{
        e.fileData = this.dataURItoBlob(e.fileData as string) as Blob;
        e.fileUrl = window.URL.createObjectURL( e.fileData )
      })
    } catch (error) {
      console.log('No recordings saved');
    }
    return data || [];
  }

  dataURItoBlob(dataURI:string) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  
  }
}
