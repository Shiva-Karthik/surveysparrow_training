import {
  LOGIN_USER,
  LOGIN_USER_LOADING,
  REGISTER_USER,
  ISAUTH
} from "./action";

const initState = {
  user: [],
  isAuth: false,
  loading: false,
};

export const userReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case ISAUTH: 
      return {...store, isAuth: payload}
    case LOGIN_USER:
      return { ...store, user: payload };
    case REGISTER_USER:
    case LOGIN_USER_LOADING:
      return { ...store, loading: true };
    default:
      return { ...store };
  }
};
