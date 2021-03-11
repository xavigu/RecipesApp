import { Action } from '@ngrx/store'

export const LOGIN_START = '[AUTH] LOGIN START'
export const LOGIN = '[AUTH] LOGIN'
export const LOGIN_FAIL = '[AUTH] LOGIN FAIL'
export const LOGOUT = '[AUTH] LOGOUT'

export class Login implements Action {
  readonly type = LOGIN

  constructor(public payload: {
    email: string;
    id: string;
    token: string;
    expirationDate: Date
  }) {}
}
export class Logout implements Action {
  readonly type = LOGOUT
}
export class LoginStart implements Action {
  readonly type = LOGIN_START

  constructor(public payload: {
    email: string;
    password: string;
  }) {}
}
export class LoginFail implements Action {
  readonly type = LOGIN_FAIL

  constructor(public payload: string) {}
}


export type AuthActions = Login | Logout | LoginStart | LoginFail;
