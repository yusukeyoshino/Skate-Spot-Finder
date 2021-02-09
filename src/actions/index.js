import { FILTER_SPOTS, FETCH_SPOTS } from "./types";
import firebase from "firebase/app";
import "firebase/firestore";

export const filterSpots = (spots, type) => {
  if (type === "all") {
    return { type: FILTER_SPOTS, payload: spots };
  } else if (type === "spot") {
    const filteredSpots = spots.filter(
      (spot) => !spot.type.includes("shop") && !spot.type.includes("park")
    );
    return { type: FILTER_SPOTS, payload: filteredSpots };
  }

  const filteredSpots = spots.filter((spot) => {
    return spot.type.includes(type);
  });
  return { type: FILTER_SPOTS, payload: filteredSpots };
};

export const fetchSpots = () => async (dispatch) => {
  let spots = [];
  const db = firebase.firestore();
  const res = await db
    .collection("spot")
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        spots.push(doc.data());
      })
    );
  dispatch({
    type: FETCH_SPOTS,
    payload: spots,
  });
};
