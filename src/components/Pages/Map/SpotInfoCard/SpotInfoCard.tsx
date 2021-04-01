import classes from "./SpotInfoCard.module.css";
import React, { useEffect, useRef } from "react";
import * as actions from "../../../../actions";
import { useDispatch } from "react-redux";
import {useTypedSelector} from "../../../../hooks/useTypedSelector"


const SpotTags = (spot:any) => {
  return spot.type.map((type:string, index:number) => {
    if (type === "shop") {
      return (
        <div
          key={`${type}_${index}`}
          style={{ backgroundColor: "orange" }}
          className={classes.spot_tag}
        >{`${type}`}</div>
      );
    } else if (type === "park") {
      return (
        <div
          key={`${type}_${index}`}
          style={{ backgroundColor: "blue" }}
          className={classes.spot_tag}
        >{`${type}`}</div>
      );
    } else {
      return (
        <div
          key={`${type}_${index}`}
          style={{ backgroundColor: "gray" }}
          className={classes.spot_tag}
        >{`${type}`}</div>
      );
    }
  });
};

interface SpotInfoCardProps {
  spot: any
}

const SpotInfoCard = ({ spot }:SpotInfoCardProps) => {
  const dispatch = useDispatch();
  const spotCardRef = useRef<HTMLDivElement | null>(null);
  const spots = useTypedSelector((state)=> state.spots.selectedSpots)

  useEffect(() => {
    if(!spotCardRef.current) return;

    let cardPosition;
    if (window.innerWidth > 959) {
      cardPosition = spotCardRef.current.offsetTop - 55;
    } else {
      cardPosition = spotCardRef.current.offsetLeft;
    }

    dispatch(actions.getSpotsPosition(cardPosition));
  }, [spots]);

  return (
    <div
      ref={spotCardRef}
      className={classes.wrapper}
      onClick={() => {
        dispatch(actions.setViewPortToSpot(spot));
        dispatch(actions.selectSpot(spot));
      }}
    >
      <div className={classes.photo}>
        <img src={spot.image_path} alt="" />
      </div>
      <div className={classes.descriptions}>
        <div className={classes.prefecture}>{`${spot.prefecture}`}</div>
        <div className={classes.name}>{`${spot.name}`}</div>
        <div className={classes.spot__tags}>{SpotTags(spot)}</div>
      </div>
      <div className={classes.likes_logo}></div>
    </div>
  );
};

export default SpotInfoCard;
