import { combineReducers } from "redux";
import spotsReducer from "./spotsReducer";
import viewPortReducer from "./viewPortReducer";

export default combineReducers({
  spots: spotsReducer,
  viewPort: viewPortReducer,
});
