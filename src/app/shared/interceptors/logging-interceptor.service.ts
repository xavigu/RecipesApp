import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    return next.handle(req).pipe(
      // check if there is a response to set the variable ok
      tap({
        next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        error: (error) => (ok = 'failed'),
      }),
      // Log when response observable(tap) either completes or errors
      finalize(() => {
        if (req.method === 'POST') {
          const elapsed = Date.now() - started;
          const msg = `Logged: ${req.method} "${req.urlWithParams}"
               ${ok} in ${elapsed} ms. ${req}`;
          console.log(msg);
        }
      })
    );
  }
}
