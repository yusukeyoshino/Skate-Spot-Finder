import { SET_VIEW_PORT, SET_VIEW_PORT_TO_SPOT } from "../actions/types";
const initialViewPort = {
  width: "100%",
  height: "100%",
  latitude: 35.676073,
  longitude: 139.771753,
  zoom: 12,
};

export default function (state = initialViewPort, action) {
  switch (action.type) {
    case SET_VIEW_PORT:
      return action.payload;
    case SET_VIEW_PORT_TO_SPOT:
      return action.payload;
    default:
      return state;
  }
}
