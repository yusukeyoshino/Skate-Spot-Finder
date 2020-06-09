import React from 'react';
import classes from './SideDrawer.module.css'; 

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.isOpened){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    const renderSearchResults = props.results.map(result=> {
                          return <div key={result.attributes.PARK_ID}>{result.attributes.SPOTNAME}</div>
                    });
         
    return(
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Title}>My Neigborhood</div>
            <div className={classes.Input}>
               <input onChange={props.inputChange} type='text' placeholder=" search location" />  
            </div>
            <div className={classes.SearchResults}>
                {renderSearchResults}
            </div>
        </div>
    );
}

export default SideDrawer;