import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

// Roles auth
export enum Role {
  ADMIN = 'admin@gmail.com',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    console.log('expiration duration:', expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      Swal.fire({
        title: 'El tiempo de sesión ha expirado, vuelve a logearte',
        width: 600,
        padding: '3em',
        background: '#fff url(../../assets/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("../../assets/images/nyan-cat.gif")
          center bottom
          no-repeat
        `,
      });
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
