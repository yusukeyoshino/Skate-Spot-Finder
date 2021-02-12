import { combineReducers } from "redux";
import selectedSpotReducer from "./selectedSpotReducer";
import spotsPositionReduer from "./spotsPositionReduer";
import spotsReducer from "./spotsReducer";
import viewPortReducer from "./viewPortReducer";

export default combineReducers({
  spots: spotsReducer,
  viewPort: viewPortReducer,
  selectedSpot: selectedSpotReducer,
  spotsPosition: spotsPositionReduer,
});
