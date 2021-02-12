import React, { useState, useEffect } from "react";
import classes from "../SpotsListView/SpotsListView.module.css";
import SpotInfoCard from "../../components/SpotInfoCard/SpotInfoCard";
import * as actions from "../../actions";
import { useDispatch } from "react-redux";

const SpotsListView = ({ spots, show, setSpotsList }) => {
  //   const toggleListView = () => {
  //     setShowListView(false);
  //   };

  if (spots.length === 0) {
    return <></>;
  }
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
          {spots.map((spot) => (
            <SpotInfoCard key={spot.document_id} spot={spot} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SpotsListView;
