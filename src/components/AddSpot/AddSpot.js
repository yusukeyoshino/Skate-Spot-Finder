import classes from "./AddSpot.module.css";
import React from "react";
import appleBadge from "../../assets/apple_badge.svg";
import screenShot from "../../assets/poty_screen.png";

const AddSpot = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        We are setting up to post your local spot in browser. Please wait for
        next update announcement. You can post your local spot on POTY - iOS.Get
        the app and share your local spot.
      </div>
      <div className={classes.right}>
        <img src={screenShot} alt="" className={classes.screen_shot} />
        <a
          href="https://apps.apple.com/us/app/poty/id1551551068"
          target="_blank"
          className={classes.link}
        >
          <img src={appleBadge} alt="" className={classes.apple} />
        </a>
      </div>
    </div>
  );
};

export default AddSpot;
