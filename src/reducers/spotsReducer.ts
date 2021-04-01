import { FETCH_SPOTS, FILTER_SPOTS } from "../actions/types";

interface SpotsState {
  spots: any[];
  selectedSpots: any[];
}

const initialState = {
  spots: [],
  selectedSpots: []
}

export default function (state:SpotsState = initialState, action:any) {
  switch (action.type) {
    case FETCH_SPOTS:
      return { spots: action.payload, selectedSpots: action.payload };
    case FILTER_SPOTS:
      return { spots: state.spots, selectedSpots: action.payload };
    default:
      return state;
  }
}
