import {
  FILTER_SPOTS,
  FETCH_SPOTS,
  SET_VIEW_PORT,
  SET_VIEW_PORT_TO_SPOT,
  SELECT_SPOT,
  SPOTS_POSTION,
  RESET_SPOTS_POSITION,
  TOGGLE_SPINNER,
} from "./types";
import firebase from "firebase/app";
import "firebase/firestore";
import { FlyToInterpolator } from "react-map-gl";
const geofire = require("geofire-common");

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

export const fetchSpots = (lat = 35.6812, lon = 139.7671) => async (
  dispatch
) => {
  let spots = [];
  const db = firebase.firestore();

  // Find cities within 50km of London
  const center = [lat, lon];
  const radiusInM = 50000;

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  const bounds = geofire.geohashQueryBounds(center, radiusInM);
  const promises = [];
  for (const b of bounds) {
    const q = db.collection("spot").orderBy("g").startAt(b[0]).endAt(b[1]);

    promises.push(q.get());
  }

  // Collect all the query results together into a single list
  Promise.all(promises)
    .then((snapshots) => {
      const matchingDocs = [];

      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          const lat = doc.get("latitude");
          const lng = doc.get("longitude");

          // We have to filter out a few false positives due to GeoHash
          // accuracy, but most will match
          const distanceInKm = geofire.distanceBetween([lat, lng], center);
          const distanceInM = distanceInKm * 1000;
          if (distanceInM <= radiusInM) {
            matchingDocs.push(doc);
          }
        }
      }

      return matchingDocs;
    })
    .then((matchingDocs) => {
      // Process the matching documents
      // ...
      matchingDocs.forEach((doc) => {
        spots.push(doc.data());
      });
      dispatch({
        type: TOGGLE_SPINNER,
      });
      dispatch({
        type: FETCH_SPOTS,
        payload: spots,
      });
    });

  //   const res = await db
  //     .collection("spot")
  //     .get()
  //     .then((querySnapshot) =>
  //       querySnapshot.forEach((doc) => {
  //         spots.push(doc.data());
  //       })
  //     );
  //   dispatch({
  //     type: FETCH_SPOTS,
  //     payload: spots,
  //   });
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
    selectedSpot: spot.document_id,
  };
  return { type: SET_VIEW_PORT_TO_SPOT, payload: viewport };
};

export const selectSpot = (spot) => {
  return { type: SELECT_SPOT, payload: spot };
};

export const getSpotsPosition = (position) => {
  return { type: SPOTS_POSTION, payload: position };
};

export const resetSpotsPosition = () => {
  return { type: RESET_SPOTS_POSITION, payload: [] };
};

export const toggleSpinner = () => {
  return { type: TOGGLE_SPINNER };
};
