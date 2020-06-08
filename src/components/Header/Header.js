import React from 'react';
import classes from './Header.module.css';

const Header = (props) => (
    <div className={classes.Header}>
        <div onClick={props.clicked} className={classes.Menu_icon}>
            <div className={classes.Hamberger}></div>
            <div className={classes.Hamberger}></div>
            <div className={classes.Hamberger}></div>
        </div>
        <div>Tokyo Street Spot</div>
    </div>
);

export default Header;