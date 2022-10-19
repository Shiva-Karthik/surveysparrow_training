
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { compose } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import {userReducer} from "./auth/reducer";
import { movieReducer } from "./movie/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  movies: movieReducer,
});
const composeEnhancers = (process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export const store = createStore(
  rootReducer,
  // compose(
  //   applyMiddleware(thunk),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // ),
  composeEnhancers(
    applyMiddleware(
      thunk
    ),
  ),
);