import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <div>
        <p>Icons made by</p>{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          {" "}
          from www.flaticon.com
        </a>
      </div>
      <div>© 2020 Tokyo Street Spot Finder</div>
    </div>
  );
};

export default Footer;
