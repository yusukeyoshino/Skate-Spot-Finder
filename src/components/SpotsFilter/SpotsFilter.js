import React from "react";
import classes from "./SpotsFilter.module.css";
import allIcon from "../../assets/all_icon.png";
import spotIcon from "../../assets/spot_icon.png";
import parkIcon from "../../assets/park_icon.png";
import shopIcon from "../../assets/shop_icon.png";
import * as actions from "../../actions";
import { useSelector, useDispatch } from "react-redux";

const selectedSpotsSelector = (state) => state.filteredSpots;
const spotsSelector = (state) => state.spots;

const SpotsFilter = ({ radio, setRadio }) => {
  const dispatch = useDispatch();
  const spotsState = useSelector(spotsSelector);

  const filterSpots = (type) => {
    dispatch(actions.filterSpots(spotsState.spots, type));
  };

  return (
    <form className={classes.wrapper}>
      <div>
        <label>
          <img src={allIcon} alt="all" />
        </label>
        <input
          type="radio"
          checked={radio === "all"}
          value="all"
          onChange={(e) => {
            setRadio(e.target.value);
            filterSpots(e.target.value);
          }}
        />
      </div>
      <div>
        <label>
          <img src={spotIcon} alt="spot" />
        </label>
        <input
          type="radio"
          checked={radio === "spot"}
          value="spot"
          onChange={(e) => {
            setRadio(e.target.value);
            filterSpots(e.target.value);
          }}
        />
      </div>
      <div>
        <label>
          <img src={parkIcon} alt="park" />
        </label>
        <input
          type="radio"
          checked={radio === "park"}
          value="park"
          onChange={(e) => {
            setRadio(e.target.value);
            filterSpots(e.target.value);
          }}
        />
      </div>
      <div>
        <label>
          <img src={shopIcon} alt="shop" />
        </label>
        <input
          type="radio"
          checked={radio === "shop"}
          value="shop"
          onChange={(e) => {
            setRadio(e.target.value);
            filterSpots(e.target.value);
          }}
        />
      </div>
    </form>
  );
};

export default SpotsFilter;
