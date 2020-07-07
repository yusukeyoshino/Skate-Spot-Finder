import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import classes from "./Layout.module.css";
import logo from "../../assets/logo.png";

const Layout = (props) => {
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  const clickHandler = () => {
    setIsLinkClicked(!isLinkClicked);
  };

  let navAboutClass = isLinkClicked
    ? [`${classes.nav_about} ${classes.nav_about_active}`]
    : [`${classes.nav_about}`];

  let navHomeClass = isLinkClicked
    ? [`${classes.nav_home} ${classes.nav_home_active}`]
    : [`${classes.nav_home}`];

  return (
    <>
      <div className={classes.logo}>
        <img src={logo} />
      </div>
      <nav className={navAboutClass}>
        <span onClick={clickHandler}>
          <Link to="/about">ABOUT</Link>
        </span>
      </nav>
      <nav onClick={clickHandler} className={navHomeClass}>
        <span onClick={clickHandler}>
          <Link to="/">HOME</Link>
        </span>
      </nav>
      <div className={classes.container}>{props.children}</div>
    </>
  );
};

export default Layout;
