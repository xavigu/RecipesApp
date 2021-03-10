import { User } from "../user.model";
import { AuthActions, LOGIN, LOGOUT } from "./auth.actions";

export interface State {
  user: User
}

const initialState: State = {
  user: null
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
        user: loginUser
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state
  }
}
