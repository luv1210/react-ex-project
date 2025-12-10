import { combineReducers } from "redux";
import authReducer from "./auth/reducers";
import studentReducer from "./Students/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  students: studentReducer,
});

export default rootReducer;