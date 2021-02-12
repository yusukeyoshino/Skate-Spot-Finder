import { TOGGLE_SPINNER } from "../actions/types";

export default function (state = false, action) {
  switch (action.type) {
    case TOGGLE_SPINNER:
      return !state;
    default:
      return state;
  }
}
