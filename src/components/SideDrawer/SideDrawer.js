import React from "react";
import classes from "./SideDrawer.module.css";
import { Link } from "react-router-dom";

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.isOpened) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <div className={attachedClasses.join(" ")}>
      <Link to="/">map</Link>
      <Link to="/about">about</Link>
      <Link to="/addspot">add your spot</Link>
    </div>
  );
};

export default SideDrawer;
