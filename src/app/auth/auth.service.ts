import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { catchError, tap } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { Store } from '@ngrx/store'

import { User } from './user.model'
import { environment } from 'src/environments/environment'
import * as fromApp from '../store/app.reducer'
import * as Auth from './store/auth.actions'

// Interface con el contenido que se espera de la signup respuesta
export interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}
// Roles auth
export enum Role {
  ADMIN = 'admin@gmail.com',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any
  // user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}

  // el BehaviourSubject emita un user a null para que no se puedan hacer peticiones que necesitan un user.token
  logout() {
    // this.user.next(null)
    this.store.dispatch(new Auth.Logout())
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  autoLogout(expirationDuration: number) {
    console.log('expiration duration:', expirationDuration)
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

  autoLogin() {
    const userData: {
      email: string
      id: string
      _token: string
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('dataUser'))
    if (!userData) {
      return
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )
    if (loadedUser.token) {
      // this.user.next(loadedUser)
      this.store.dispatch(
        new Auth.AuthenticationSuccess({
          email: loadedUser.email, 
          id: loadedUser.id, 
          token: loadedUser.token, 
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      );
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime() // getTime from seconds to miliseconds
      this.autoLogout(expirationDuration)
    }
  }
}
