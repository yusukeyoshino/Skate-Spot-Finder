import classes from "./SpotInfoCard.module.css";
import React from "react";

const SpotTags = (spot) => {
  return spot.type.map((type) => {
    if (type === "shop") {
      return (
        <div
          style={{ backgroundColor: "orange" }}
          className={classes.spot_tag}
        >{`${type}`}</div>
      );
    } else if (type === "park") {
      return (
        <div
          style={{ backgroundColor: "blue" }}
          className={classes.spot_tag}
        >{`${type}`}</div>
      );
    } else {
      return (
        <div
          style={{ backgroundColor: "gray" }}
          className={classes.spot_tag}
        >{`${type}`}</div>
      );
    }
  });
};

const SpotInfoCard = ({ spot }) => {
  return (
    <div className={classes.wrapper}>
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
