import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      console.log('CachingInterceptor cached response: ', cachedResponse);
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap({
        next: (response) => {
          if (response instanceof HttpResponse) {
            console.log('CachingInterceptor response: ', response);
            this.cache.set(req.url, response);
          }
        },
        error: (error) => console.log('CachingInterceptor error: ', error.message),
      })
    );
  }
}
