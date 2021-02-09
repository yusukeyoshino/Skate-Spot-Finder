import { FETCH_SPOTS, FILTER_SPOTS } from "../actions/types";

export default function (state = { spots: [], selectedSpots: [] }, action) {
  switch (action.type) {
    case FETCH_SPOTS:
      return { spots: action.payload, selectedSpots: action.payload };
    case FILTER_SPOTS:
      return { spots: state.spots, selectedSpots: action.payload };
    default:
      return state;
  }
}
