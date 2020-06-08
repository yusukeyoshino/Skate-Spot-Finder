import React from 'react';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.isOpened){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return(
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Title}>My Neigborhood</div>
            <div className={classes.Input}>
               <input type='text' placeholder=" search location" />  
            </div>
        </div>
    );
}

export default SideDrawer;