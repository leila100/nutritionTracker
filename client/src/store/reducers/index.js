import { LOGIN_USER } from "../actions";

const initialState = {
  currentUser: null
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: payload
      };

    default:
      return state;
  }
}
