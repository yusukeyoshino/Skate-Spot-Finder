import classes from "./SpotInfoCard.module.css";
import React, { useEffect, useRef } from "react";
import * as actions from "../../../../actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const spotsSelector = (state) => state.spots;

const SpotTags = (spot) => {
  return spot.type.map((type, index) => {
    if (type === "shop") {
      return (
        <div
          key={`${type}_${index}`}
          style={{ backgroundColor: "orange" }}
          className={classes.spot_tag}
        >{`${type}`}</div>
      );
    } else if (type === "park") {
      return (
        <div
          key={`${type}_${index}`}
          style={{ backgroundColor: "blue" }}
          className={classes.spot_tag}
        >{`${type}`}</div>
      );
    } else {
      return (
        <div
          key={`${type}_${index}`}
          style={{ backgroundColor: "gray" }}
          className={classes.spot_tag}
        >{`${type}`}</div>
      );
    }
  });
};

const SpotInfoCard = ({ spot }) => {
  const dispatch = useDispatch();
  const spotCardRef = useRef(null);
  const spots = useSelector(spotsSelector).selectedSpots;

  useEffect(() => {
    let cardPosition;
    if (window.innerWidth > 959) {
      cardPosition = spotCardRef.current.offsetTop - 55;
    } else {
      cardPosition = spotCardRef.current.offsetLeft;
    }

    dispatch(actions.getSpotsPosition(cardPosition));
  }, [spots]);

  return (
    <div
      ref={spotCardRef}
      className={classes.wrapper}
      onClick={() => {
        dispatch(actions.setViewPortToSpot(spot));
        dispatch(actions.selectSpot(spot));
      }}
    >
      <div className={classes.photo}>
        <img src={spot.image_path} alt="" />
      </div>
      <div className={classes.descriptions}>
        <div className={classes.prefecture}>{`${spot.prefecture}`}</div>
        <div className={classes.name}>{`${spot.name}`}</div>
        <div className={classes.spot__tags}>{SpotTags(spot)}</div>
      </div>
      <div className={classes.likes_logo}></div>
    </div>
  );
};

export default SpotInfoCard;
