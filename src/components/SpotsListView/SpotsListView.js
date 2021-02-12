import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "../SpotsListView/SpotsListView.module.css";
import SpotInfoCard from "../../components/SpotInfoCard/SpotInfoCard";
import * as actions from "../../actions";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const spotsSelector = (state) => state.spots;
const spinnerSelector = (state) => state.showSpinner;

const SpotsListView = ({ spots, show, setSpotsList }) => {
  //   const toggleListView = () => {
  //     setShowListView(false);
  //   };

  const showSpinner = useSelector(spinnerSelector);

  const renderContents = () => {
    if (spots.length > 0) {
      return spots.map((spot) => (
        <SpotInfoCard key={spot.document_id} spot={spot} />
      ));
    } else if (!showSpinner) {
      return (
        <div className={classes.no_result__wrapper}>
          <FontAwesomeIcon className={classes.icon} icon={faMapMarkerAlt} />
          <div>
            No Spots Found <br /> Try change location or <br /> spot type
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div
        className={`${classes.container} ${show ? classes.container_open : ""}`}
      >
        <div className={classes.header}>
          <div onClick={() => setSpotsList(false)} className={classes.multiply}>
            &#215;
          </div>
        </div>
        <div className={classes.lists} id="spots_list">
          {renderContents()}
        </div>
      </div>
    </>
  );
};

export default SpotsListView;
