import React from "react";
import classes from "./SideDrawer.module.css";
import { Link } from "react-router-dom";
import Backdrop from "../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.isOpened) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <>
      <Backdrop clicked={props.remove} show={props.isOpened} />
      <div className={attachedClasses.join(" ")}>
        <Link to="/">map</Link>
        <Link to="/about">about</Link>
        <Link to="/addspot">add your spot</Link>
        <div onClick={() => props.setShowModal(true)}>How to use</div>
        <Link to="/terms-conditions">terms and conditions</Link>
        <Link to="/privacy-policy">privacy and policy</Link>
      </div>
    </>
  );
};

export default SideDrawer;
