export const LOGIN_USER = "LOGIN_USER";
export const IS_LOGGED_IN = "IS_LOGGED_IN";
export const SAVE_USERS = "SAVE_USERS";

export function loginUser(user) {
  return { type: LOGIN_USER, payload: user };
}

export function isLoggedIn(isAuth) {
  return { type: IS_LOGGED_IN, payload: isAuth };
}

export function saveUsers(users) {
  return { type: SAVE_USERS, payload: users };
}
