import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http'
import { Store } from '@ngrx/store'
import { take, map, exhaustMap } from 'rxjs/operators'

import * as fromApp from '../store/app.reducer'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user
      }),
      exhaustMap((user) => {
        // check if we dont have user(before login or signup) entonces no le añade el user.token ya que no lo tiene
        if (!user) {
          return next.handle(req)
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        })
        return next.handle(modifiedReq)
      })
    )
  }
}
