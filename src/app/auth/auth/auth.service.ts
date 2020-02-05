import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

//Interface con el contenido que se espera de la signup respuesta
export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  API_KEY = 'AIzaSyDZHGlZOqyCfD28_Pf6c8z3lAeUQ27QKh0';
  
  constructor(private http: HttpClient) { }

  signup(email:string, password:string){
    //Se le pasara a la peticion post un object con las properties que espera obtener
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, 
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => { //tap nos permite realizar alguna accion sin cambiar la response
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    })); 

  };

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, 
    {
      email: email,
      password: password,
      returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => { //tap nos permite realizar alguna accion sin cambiar la response
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  //method to handle authentication
  private handleAuthentication(email:string, userId:string, token:string, expiresIn: number){
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }

  //method that return throwError and use it in the catchError operator
  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.'
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.'
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.'
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.'
        break;
      default:
        break;
    }
    return throwError(errorMessage); 

  }
}
