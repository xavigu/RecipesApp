import { User } from "../user.model";
import { AuthActions, LOGIN, LOGIN_FAIL, LOGIN_START, LOGOUT } from "./auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state: State = initialState, action: AuthActions) {
  switch (action.type) {
    case LOGIN:
      const loginUser = new User(action.payload.email, 
                                 action.payload.id, 
                                 action.payload.token, 
                                 action.payload.expirationDate);
      return {
        ...state,
        authError: null,
        user: loginUser,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    case LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    default:
      return state
  }
}
