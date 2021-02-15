import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, GeolocateControl, Popup } from "react-map-gl";
import SpotInfo from "../SpotInfo/SpotInfo";
import Modal from "../UI/Modal/Modal";
import classes from "./Map.module.css";
import "firebase/firestore";
import spotIcon from "../../assets/spot_icon.png";
import shopIcon from "../../assets/shop_icon.png";
import parkIcon from "../../assets/park_icon.png";
import SpotsListView from "../../components/SpotsListView/SpotsListView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const geolocateStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  margin: 10,
};

const spotsSelector = (state) => state.spots;
const viewPortSelector = (state) => state.viewPort;
const selectedSpotSelector = (state) => state.selectedSpot;
const spotsPositionSelector = (state) => state.spotsPosition;
const spinnerSelector = (state) => state.showSpinner;

const Map = () => {
  const [isSpotDetail, setIsSpotDetail] = useState(false);
  const [spotInfo, setSpotInfo] = useState(null);
  const [popupID, setPopupID] = useState(null);
  const [showSpotsList, setSpotsList] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(true);

  const dispatch = useDispatch();
  const spotsState = useSelector(spotsSelector);
  const viewPort = useSelector(viewPortSelector);
  const selectedSpot = useSelector(selectedSpotSelector);
  const spotsPosition = useSelector(spotsPositionSelector);
  const showSpinner = useSelector(spinnerSelector);

  useEffect(() => {
    dispatch(actions.toggleSpinner());
    dispatch(actions.fetchSpots());
  }, []);

  const removeModal = () => {
    setIsSpotDetail(false);
  };

  const showPopup = (e) => {
    setPopupID(parseInt(e.target.id));
  };
  const hidePopup = (e) => {
    setPopupID(null);
  };

  const renderMarker = (spot) => {
    if (spot.type.includes("shop")) {
      return <img id={spot.document_id} alt="" src={shopIcon} />;
    } else if (spot.type.includes("park")) {
      return <img id={spot.document_id} alt="" src={parkIcon} />;
    } else {
      return <img id={spot.document_id} alt="" src={spotIcon} />;
    }
  };

  const scaleIcon = (spot) => {
    if (
      selectedSpot !== null &&
      selectedSpot.document_id === spot.document_id
    ) {
      return { transform: "scale(1.7)" };
    } else {
      return {};
    }
  };

  const moveSpotsCards = (index) => {
    const spotsListElement = window.document.getElementById("spots_list");
    const cardPosition = spotsPosition[index];

    if (window.innerWidth > 959) {
      spotsListElement.scrollTo({
        top: cardPosition,
        left: 0,
        behavior: "smooth",
      });
    } else {
      spotsListElement.scrollTo({
        top: 0,
        left: cardPosition,
        behavior: "smooth",
      });
    }
  };

  const mapSpotData = () => {
    if (!spotsState.selectedSpots) {
      return;
    }

    return spotsState.selectedSpots.map((spot, index) => (
      <React.Fragment key={spot.document_id}>
        <Marker
          key={spot.document_id}
          latitude={spot.latitude}
          longitude={spot.longitude}
        >
          <button
            onClick={() => moveSpotsCards(index)}
            onMouseEnter={showPopup}
            onMouseLeave={hidePopup}
            className={classes.button}
            style={scaleIcon(spot)}
          >
            {renderMarker(spot)}
            <div className={classes.marker_title}>{spot.name}</div>
          </button>
        </Marker>
      </React.Fragment>
    ));
  };

  return (
    <>
      <div
        className={classes.spots_list_button}
        onClick={() => setSpotsList(true)}
      >
        <FontAwesomeIcon className={classes.arrow} icon={faAngleDoubleLeft} />
        <span
          className={classes.spots_count}
        >{`${spotsState.spots.length} spots found`}</span>
      </div>
      {showSearchButton ? (
        <div
          onClick={() => {
            dispatch(actions.resetSpotsPosition());
            dispatch(actions.toggleSpinner());
            const lat = viewPort.latitude;
            const lon = viewPort.longitude;
            dispatch(actions.fetchSpots(lat, lon));
          }}
          className={`${
            showSpotsList ? classes.nearby_search_shrink : classes.nearby_search
          }`}
        >
          {showSpinner ? "Searching..." : "Search this area"}
        </div>
      ) : (
        ""
      )}

      <SpotsListView
        spots={spotsState.selectedSpots}
        show={showSpotsList}
        setSpotsList={setSpotsList}
        style={{ display: `${showSpotsList ? "block" : "none"}` }}
      />
      <ReactMapGL
        {...viewPort}
        onViewportChange={(viewPort) => {
          setShowSearchButton(true);
          dispatch(actions.setViewPort(viewPort));
        }}
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
