import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (expiresIn: number, email: string, localId: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, localId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticationSuccess({
    email,
    id: localId,
    token,
    expirationDate,
    redirect: true,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occured';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticationFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'The email address is already in use by another account.';
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled for this project.';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'The password is invalid or the user does not have a password.';
      break;
    case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled by an administrator.';
      break;
    default:
      break;
  }
  return of(new AuthActions.AuthenticationFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupData: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
          {
            email: signupData.payload.email,
            password: signupData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
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
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'No userData effect' };
      }
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (loadedUser.token) {
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); // getTime from seconds to miliseconds
        this.authService.setLogoutTimer(expirationDuration);

        return new AuthActions.AuthenticationSuccess({
          email: loadedUser.email,
          id: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false,
        });
      }
      return { type: 'LoadedUser expiration effect' };
    })
  );

  // to say to NgRx that is not an effect that dispatch an action inside you need pass dispatch: false
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATION_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticationSuccess) => {
      console.log('Redirection: ', authSuccessAction.payload.redirect);
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
      this.router.navigate(['/auth']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
