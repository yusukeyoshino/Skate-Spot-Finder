import React from "react";
import {useTypedSelector} from "../../../../hooks/useTypedSelector"
import classes from "../SpotsListView/SpotsListView.module.css";
import SpotInfoCard from "../SpotInfoCard/SpotInfoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

interface SpotsListViewProps {
  spots: any;
  show: boolean;
  setSpotsList: any
}



const SpotsListView = ({ spots, show, setSpotsList }:SpotsListViewProps)=> {

  const showSpinner = useTypedSelector(state => state.showSpinner);

  const renderContents = () => {
    if (spots.length > 0) {
      return spots.map((spot:any) => (
        <SpotInfoCard key={spot.document_id} spot={spot} />
      ));
    } else if (!showSpinner) {
      return (
        <div className={classes.no_result__wrapper}>
          <FontAwesomeIcon className={classes.icon} icon={faMapMarkerAlt} />
          <div>
            No Spots Found <br /> Try change location or <br /> spot type
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div
        className={`${classes.container} ${show ? classes.container_open : ""}`}
      >
        <div className={classes.header}>
          <div onClick={() => setSpotsList(false)} className={classes.multiply}>
            &#215;
          </div>
        </div>
        <div className={classes.lists} id="spots_list">
          {renderContents()}
        </div>
      </div>
    </>
  );
};

export default SpotsListView;
