import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'

import * as fromApp from '../store/app.reducer'


// puedes ponerle el provideIn:'root' o meterlo en el apartado de providers del app.module
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user
      }),
      map((user) => {
        const isAuth = !!user
        if (isAuth) {
          return true
        } else {
          return this.router.createUrlTree(['/auth'])
        }
      })
    )
  }
}
