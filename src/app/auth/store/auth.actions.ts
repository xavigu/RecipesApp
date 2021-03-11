import { Action } from '@ngrx/store'

export const LOGIN_START = '[AUTH] LOGIN START'
export const SIGNUP_START = '[AUTH] SIGNUP START'
export const AUTHENTICATION_SUCCESS = '[AUTH] AUTHENTICATION SUCCESS'
export const AUTHENTICATION_FAIL = '[AUTH] AUTHENTICATION FAIL'

export const LOGOUT = '[AUTH] LOGOUT'
export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS

  constructor(public payload: {
    email: string;
    id: string;
    token: string;
    expirationDate: Date
  }) {}
}
export class AuthenticationFail implements Action {
  readonly type = AUTHENTICATION_FAIL

  constructor(public payload: string) {}
}
export class LoginStart implements Action {
  readonly type = LOGIN_START

  constructor(public payload: {
    email: string;
    password: string;
  }) {}
}
export class SignupStart implements Action {
  readonly type = SIGNUP_START

  constructor(public payload: {
    email: string;
    password: string;
  }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT
}

export type AuthActions = LoginStart |SignupStart | AuthenticationSuccess| AuthenticationFail | Logout;
