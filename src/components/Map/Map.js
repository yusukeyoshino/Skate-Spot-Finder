import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, GeolocateControl, Popup } from "react-map-gl";
import SpotInfo from "../SpotInfo/SpotInfo";
import Modal from "../UI/Modal/Modal";
import classes from "./Map.module.css";
import * as contentful from "contentful";

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10,
};

const Map = (props) => {
  const [spotData, setSpotData] = useState(null);
  const [isSpotDetail, setIsSpotDetail] = useState(false);
  const [spotInfo, setSpotInfo] = useState(null);
  const [popupID, setPopupID] = useState(null);

  const [viewport, setViewport] = useState({
    width: "90vw",
    height: "85vh",
    latitude: 35.676073,
    longitude: 139.771753,
    zoom: 12,
  });

  const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  });

  useEffect(() => {
    client.getEntries().then((response) => setSpotData(response.items));
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
    return spotData.map(({ fields }) => (
      <>
        <Marker
          key={fields.id}
          latitude={fields.geometry.lat}
          longitude={fields.geometry.lon}
        >
          <button
            onMouseEnter={showPopup}
            onMouseLeave={hidePopup}
            onClick={() => iconClick(fields)}
            className={classes.button}
          >
            <img src="/skateboard.svg" alt="skate-logo" id={fields.id} />
          </button>
        </Marker>
        {popupID === fields.id ? (
          <Popup
            className={classes.popup}
            longitude={fields.geometry.lon}
            latitude={fields.geometry.lat}
            closeButton={false}
            closeOnClick={false}
          >
            <p>{fields.spotName}</p>
            <img src={`${fields.spotImage[0].fields.file.url}`} />
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
