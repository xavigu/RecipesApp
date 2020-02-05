import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

//Interface con el contenido que se espera de la signup respuesta
export interface AuthResponseData{
  kind: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  API_KEY = 'AIzaSyDZHGlZOqyCfD28_Pf6c8z3lAeUQ27QKh0';

  signup(email:string, password:string){
    //Se le pasara a la peticion post un object con las properties que espera obtener
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, 
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorResp => {
      let errorMessage = 'An unknown error occured';
      if (!errorResp.error || !errorResp.error.error) {
        return throwError(errorMessage);
      }
      switch (errorResp.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'The email address is already in use by another account.'
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project.'
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
          break;
        default:
          break;
        }
        return throwError(errorMessage); 
    }));
  };

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, 
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
}
