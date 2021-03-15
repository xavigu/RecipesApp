import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import * as AuthActions from "./auth.actions";

export interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

const handleAuthentication = (expiresIn: number, email: string, localId: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  return new AuthActions.AuthenticationSuccess({
      email: email, 
      id: localId, 
      token: token, 
      expirationDate: expirationDate
    })
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occured'
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticationFail(errorMessage));
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
  return of(new AuthActions.AuthenticationFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router){}

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupData: AuthActions.SignupStart) => {
      return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
        {
          email: signupData.payload.email,
          password: signupData.payload.password,
          returnSecureToken: true,
        }).pipe(
          map(resData => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
          }),
          catchError(errorRes => {
            return handleError(errorRes)
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        }
      ).pipe(
          map(resData => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
          }),
          catchError(errorRes => {
            return handleError(errorRes)
          })
        );
    }),
  );

  // to say to NgRx that is not an effect that dispatch an action inside you need pass dispatch: false
  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATION_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  )

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/auth']);
    })
  )


}

