import {
  ADD_MOVIE,
  DELETE_MOVIE,
  GET_ALL_MOVIES,
  GET_ONE_MOVIE,
  GET_SEARCHED_MOVIE,
  MOVIES_LOADING,
  UPDATE_MOVIES,
} from "./action";

const initState = {
  movies: [],
  loading: false,
};

export const movieReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case GET_ONE_MOVIE:
    case GET_ALL_MOVIES:
    case GET_SEARCHED_MOVIE:
      return { ...store, movies: payload, loading: false };
    case ADD_MOVIE:
      return { ...store, movies: payload, loading: false };
    case MOVIES_LOADING:
    case UPDATE_MOVIES:
    case DELETE_MOVIE:
      return { ...store, loading: true };
    default:
      return { ...store, loading: false };
  }
};
