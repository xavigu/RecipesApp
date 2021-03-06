import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'
import { throwError, Subject, BehaviorSubject } from 'rxjs'
import { User } from './user.model'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'

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
  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    // Se le pasara a la peticion post un object con las properties que espera obtener
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        })
      )
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true,
          // catchError recoge el error de un Observable
          // this.handleError is a method that return with throwError an Observable that emits an error notification
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          // tap nos permite realizar alguna accion con la data que llega sin cambiarla para cuando hagas el subscribe
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        })
      )
  }

  // el BehaviourSubject emita un user a null para que no se puedan hacer peticiones que necesitan un user.token
  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('dataUser')
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
      this.user.next(loadedUser)
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime() // getTime from seconds to miliseconds
      this.autoLogout(expirationDuration)
    }
  }

  // method to handle authentication
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    this.user.next(user)
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('dataUser', JSON.stringify(user))
  }

  // method that return throwError and use it in the catchError operator
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.'
        break
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.'
        break
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.'
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.'
        break
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.'
        break
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.'
        break
      default:
        break
    }
    return throwError(errorMessage)
  }
}
