import { RESET_SPOTS_POSITION, SPOTS_POSTION } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case SPOTS_POSTION:
      return [...state, action.payload];
    case RESET_SPOTS_POSITION:
      return [];
    default:
      return state;
  }
}
