import {
  FILTER_SPOTS,
  FETCH_SPOTS,
  SET_VIEW_PORT,
  SET_VIEW_PORT_TO_SPOT,
} from "./types";
import firebase from "firebase/app";
import "firebase/firestore";
import { FlyToInterpolator } from "react-map-gl";

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

export const setViewPort = (viewPort) => {
  const viewport = {
    ...viewPort,
  };

  return { type: SET_VIEW_PORT, payload: viewport };
};

export const setViewPortToSpot = (spot) => {
  let longitude;
  if (window.innerWidth > 959) {
    longitude = spot.longitude - 0.01;
  } else {
    longitude = spot.longitude;
  }

  const viewport = {
    width: "100%",
    height: "100%",
    longitude: longitude,
    latitude: spot.latitude,
    zoom: 14,
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator(),
  };
  return { type: SET_VIEW_PORT_TO_SPOT, payload: viewport };
};
