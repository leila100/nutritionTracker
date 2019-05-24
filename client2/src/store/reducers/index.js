import { LOGIN_USER, IS_LOGGED_IN, SAVE_USERS } from "../actions";

const initialState = {
  currentUser: null,
  isAuth: false,
  users: []
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
    case SAVE_USERS: {
      return {
        ...state,
        users: payload
      };
    }
    default:
      return state;
  }
}
