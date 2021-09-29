import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TEXT_SPEECH_API_URL, API_AUTH } from '../constant/config';
import { catchError, finalize, mergeMap, tap } from 'rxjs/operators'
import { AlertsService } from './alerts.service';
import { Observable, of, throwError, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient, private alrts: AlertsService) { }


  get<T>(path: string, params?: any) {
    let hParams: HttpParams = new HttpParams();
    params ? hParams.appendAll(params) : {};
    return this.httpClient.get<T>(TEXT_SPEECH_API_URL + path, {
      headers:
        new HttpHeaders({
          'authorization': 'Basic ' + btoa(API_AUTH),
        }),
      params: hParams
    }).pipe(catchError((e: HttpErrorResponse, c) => {
      this.handleErrorResponse(e);
      return throwError(e);
    }));
  }

  post<T>(path: string, params: {}) {
    return this.httpClient.post<T>(TEXT_SPEECH_API_URL + path, params, {
      headers:
        new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': 'Basic ' + btoa(API_AUTH),
        })
      ,
    }).pipe(catchError((e: HttpErrorResponse, c) => {
      this.handleErrorResponse(e);
      return throwError(e);
    }));
  }

  // for file responses
  postRfile(path: string, params: any, accept: string = 'audio/wav') {
    return this.httpClient.post(TEXT_SPEECH_API_URL + path, params, {
      headers:
        new HttpHeaders({
          'Accept': accept,
          'Content-Type': 'application/json',
          'authorization': 'Basic ' + btoa(API_AUTH),
        })
      ,
      responseType: 'blob',
    }).pipe(catchError((e: HttpErrorResponse, c) => {
      this.handleErrorResponse(e);
      return throwError(e);
    }));
  }

  private handleErrorResponse(err: HttpErrorResponse) {
    switch (err.status) {
      case 0:
        this.alrts.showSnakBar('No internet connection!')
        break;
      case 401:
        this.alrts.showSnakBar('Unauthenticated!')
        break;
      case 400:
        this.alrts.showSnakBar(err.message)
        break;
      default:
        this.alrts.showSnakBar('Error ,Please try again later!')

        break;
    }
  }

}

export const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 1000,
  excludedStatusCodes = []
}: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
      mergeMap((error, i) => {
          const retryAttempt = i + 1;
          // if maximum number of retries have been met
          // or response is a status code we don't wish to retry, throw error
          if (
              retryAttempt > maxRetryAttempts ||
              excludedStatusCodes.find(e => e === error.status)
          ) {
              return throwError(error);
          }
          console.log(
              `Attempt ${retryAttempt}: retrying in ${retryAttempt *
              scalingDuration}ms`
          );
          // retry after 1s, 2s, etc...
          return timer(retryAttempt * scalingDuration);
      }),
      finalize(() => console.log('We are done!'))
  );
};