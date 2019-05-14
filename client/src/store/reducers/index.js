import { LOGIN_USER, IS_LOGGED_IN } from "../actions";

const initialState = {
  currentUser: null,
  isAuth: false
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: payload,
        isAuth: true
      };

    case IS_LOGGED_IN:
      return {
        ...state,
        isAuth: payload
      };
    default:
      return state;
  }
}
