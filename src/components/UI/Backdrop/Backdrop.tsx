import React from "react";
import classes from "./Backdrop.module.css";

interface BackdropProps {
  clicked: ()=>any;
  show : boolean;
}

const Backdrop = (props:BackdropProps) => {
  return props.show ? (
    <div onClick={props.clicked} className={classes.Backdrop}></div>
  ) : null;
};

export default Backdrop;
