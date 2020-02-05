import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Interface con el contenido que se espera de la signup respuesta
interface AuthResponseData{
  kind: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
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
    })
  }
}
