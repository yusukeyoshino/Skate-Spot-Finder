import React from "react";
import classes from "./About.module.css";

const About = () => {
  return (
    <div className={classes.container}>
      <div className={classes.left}></div>
      <div className={classes.right}>
        struggle to find a skate spot in tokyo?
        <br /> Then use this map! <br />
        accept your local spot
      </div>
    </div>
  );
};

export default About;
