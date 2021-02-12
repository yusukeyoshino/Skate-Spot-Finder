import { SELECT_SPOT } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case SELECT_SPOT:
      return action.payload;
    default:
      return state;
  }
}
