import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import {thunk} from "redux-thunk";
import authReducer from "../Redux/auth/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
