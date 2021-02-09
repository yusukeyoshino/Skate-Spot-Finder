import { combineReducers } from "redux";
import spotsReducer from "./spotsReducer";

export default combineReducers({
  spots: spotsReducer,
});
