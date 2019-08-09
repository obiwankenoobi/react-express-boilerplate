import { actionTypes } from "../actions/authActions";
import { AnyAction, Reducer } from "redux";

export const initialState = {
  token: "",
  username: "",
  isHaveAccount: false
};


type AuthState = {
  token:string;
  username:string;
  isHaveAccount:boolean;
}
type AuthAction = {
  token:string;
  isHaveAccount:boolean;
  username:string;
  type:string;
}

function reducerAuth(state = initialState, action:AuthAction): AuthState {
  switch (action.type) {
    case actionTypes.ADD_TOKEN:

      return {
        ...state,
        token: action.token
      };

    case actionTypes.ADD_USERNAME:
      return {
        ...state,
        username: action.username
      };

    case actionTypes.SIGNED:
      return {
        ...state,
        isHaveAccount: !state.isHaveAccount
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        token: ""
      };

    default:
      return state;
  }
};

export default reducerAuth;
