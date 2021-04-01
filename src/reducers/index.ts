import { combineReducers } from "redux";
import selectedSpotReducer from "./selectedSpotReducer";
import spinnerReducer from "./spinnerReducer";
import spotsPositionReduer from "./spotsPositionReduer";
import spotsReducer from "./spotsReducer";
import viewPortReducer from "./viewPortReducer";

const reducers =  combineReducers({
  spots: spotsReducer,
  viewPort: viewPortReducer,
  selectedSpot: selectedSpotReducer,
  spotsPosition: spotsPositionReduer,
  showSpinner: spinnerReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;