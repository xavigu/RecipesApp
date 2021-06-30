import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupMessageService } from '../shared/popup-message.service';

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

  constructor(private store: Store<fromApp.AppState>, private popupMessage: PopupMessageService) {}

  setLogoutTimer(expirationDuration: number) {
    console.log('expiration duration:', expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.popupMessage.showBackdropMessage('POPUP-EXPIRATION');
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
