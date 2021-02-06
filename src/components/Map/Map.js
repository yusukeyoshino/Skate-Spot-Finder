import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, GeolocateControl, Popup } from "react-map-gl";
import SpotInfo from "../SpotInfo/SpotInfo";
import Modal from "../UI/Modal/Modal";
import classes from "./Map.module.css";
import firebase from "firebase/app";
import "firebase/firestore";

const geolocateStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  margin: 10,
};

const Map = (props) => {
  const [spotData, setSpotData] = useState(null);
  const [isSpotDetail, setIsSpotDetail] = useState(false);
  const [spotInfo, setSpotInfo] = useState(null);
  const [popupID, setPopupID] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 35.676073,
    longitude: 139.771753,
    zoom: 12,
  });

  const db = firebase.firestore();

  useEffect(() => {
    let spots = [];
    async function fetchData() {
      await db
        .collection("spot")
        .get()
        .then((querySnapshot) =>
          querySnapshot.forEach((doc) => {
            spots.push(doc.data());
          })
        );
      console.log(spots);
      setSpotData(spots);
    }

    fetchData();
  }, []);

  const iconClick = (fields) => {
    setSpotInfo(fields);
    setIsSpotDetail(true);
  };

  const spotDetail = (fields) => {
    setSpotInfo(fields);
    setIsSpotDetail(true);
  };

  const removeModal = () => {
    setIsSpotDetail(false);
  };

  const showPopup = (e) => {
    setPopupID(parseInt(e.target.id));
  };
  const hidePopup = (e) => {
    setPopupID(null);
  };

  const mapSpotData = () => {
    if (!spotData) {
      return;
    }

    return spotData.map((spot) => (
      <>
        <Marker
          key={spot.document_id}
          latitude={spot.latitude}
          longitude={spot.longitude}
        >
          <button
            onMouseEnter={showPopup}
            onMouseLeave={hidePopup}
            onClick={() => iconClick(spot)}
            className={classes.button}
          >
            <img src="/skateboard.svg" alt="skate-logo" id={spot.id} />
          </button>
        </Marker>
        {popupID === spot.id ? (
          <Popup
            className={classes.popup}
            longitude={spot.geometry.lon}
            latitude={spot.geometry.lat}
            closeButton={false}
            closeOnClick={false}
          >
            <p>{spot.spotName}</p>
            <img src={`${spot.spotImage[0].spot.file.url}`} />
          </Popup>
        ) : (
          <div></div>
        )}
      </>
    ));
  };

  return (
    <>
      <Modal remove={removeModal} show={isSpotDetail}>
        <SpotInfo remove={removeModal} info={spotInfo} />
      </Modal>
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={"mapbox://styles/yusukeyoshino/ckaqtjf8u1a0g1io2vgm7nsp9"}
      >
        {mapSpotData()}
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          style={geolocateStyle}
          //
        />
      </ReactMapGL>
    </>
  );
};

export default Map;
