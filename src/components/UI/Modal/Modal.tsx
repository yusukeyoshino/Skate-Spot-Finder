import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

interface ModalProps {
  remove: ()=> any;
  show: Boolean;
  children: any;
}

const Modal = (props:ModalProps) => {
  return (
    <>
      <Backdrop clicked={props.remove} show={props.show} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
