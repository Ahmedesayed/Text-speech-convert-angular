import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { share, tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map()

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get("reset")) {
      this.cache.delete(req)
    }
    const cachedResponse: HttpResponse<any> | undefined = this.cache.get(req)
    if (cachedResponse) {
      return of(cachedResponse.clone())
    } else {
      return next.handle(req).pipe(
        tap(stateEvent => {
          if (stateEvent instanceof HttpResponse) {
            this.cache.set(req, stateEvent.clone())
          }
        })
      ).pipe(share())
    }
  }
}
