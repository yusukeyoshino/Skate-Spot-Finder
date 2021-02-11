import classes from "./SpotInfoCard.module.css";
import React from "react";
import * as actions from "../../actions";
import { useDispatch } from "react-redux";

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
  return (
    <div
      className={classes.wrapper}
      onMouseEnter={() => dispatch(actions.setViewPortToSpot(spot))}
      onClick={() => dispatch(actions.setViewPortToSpot(spot))}
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
