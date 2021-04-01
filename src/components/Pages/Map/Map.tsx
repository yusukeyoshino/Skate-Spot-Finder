import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import WeatherCard from "./WeatherCard/WeatherCard";
import classes from "./Map.module.css";
import "firebase/firestore";
import spotIcon from "../../../assets/spot_icon.png";
import shopIcon from "../../../assets/shop_icon.png";
import parkIcon from "../../../assets/park_icon.png";
import SpotsListView from "./SpotsListView/SpotsListView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../../actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import SpotModel from "../../../Model/SpotModel"




const Map = () => {
  const [isSpotDetail, setIsSpotDetail] = useState(false);
  const [showSpotsList, setSpotsList] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  const dispatch = useDispatch();

  const {spots:spotsState,viewPort,selectedSpot,spotsPosition,showSpinner} = useTypedSelector((state)=>state)




  useEffect(() => {
    dispatch(actions.toggleSpinner());
    dispatch(actions.fetchSpots());
  }, []);

  useEffect(() => {
    const getWeatherJson = async () => {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
    };
    getWeatherJson();
  }, []);



  const renderMarker = (spot:SpotModel) => {
    if (spot.type.includes("shop")) {
      return <img id={spot.document_id} alt="" src={shopIcon} />;
    } else if (spot.type.includes("park")) {
      return <img id={spot.document_id} alt="" src={parkIcon} />;
    } else {
      return <img id={spot.document_id} alt="" src={spotIcon} />;
    }
  };

  const scaleIcon = (spot:SpotModel) => {
    if (
      selectedSpot !== null &&
      selectedSpot.document_id === spot.document_id
    ) {
      return { transform: "scale(1.7)" };
    } else {
      return {};
    }
  };

  const moveSpotsCards = (index:number) => {
    const spotsListElement = window.document.getElementById("spots_list") as HTMLDivElement;
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

    return spotsState.selectedSpots.map((spot:SpotModel, index:number) => (
      <React.Fragment key={spot.document_id}>
        <Marker
          key={spot.document_id}
          latitude={spot.latitude}
          longitude={spot.longitude}
        >
          <button
            onClick={() => {
              moveSpotsCards(index);
              if (window.innerWidth > 960) {
                setSpotsList(true);
              }
            }}
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
        <WeatherCard weatherData={weatherData} />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          className={classes.geolocation_control}
          //
        />
      </ReactMapGL>
    </>
  );
};

export default Map;
