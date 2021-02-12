import React, { useRef } from "react";
import classes from "./SpotsFilter.module.css";
import allIcon from "../../assets/all_icon.png";
import spotIcon from "../../assets/spot_icon.png";
import parkIcon from "../../assets/park_icon.png";
import shopIcon from "../../assets/shop_icon.png";
import * as actions from "../../actions";
import { useSelector, useDispatch } from "react-redux";

const spotsSelector = (state) => state.spots;

const SpotsFilter = ({ radio, setRadio }) => {
  const dispatch = useDispatch();
  const spotsState = useSelector(spotsSelector);

  const dropDownElement = useRef(null);

  const filterSpots = (type) => {
    dispatch(actions.resetSpotsPosition());
    dispatch(actions.filterSpots(spotsState.spots, type));
  };

  const renderIcon = () => {
    switch (radio) {
      case "all":
        return allIcon;
      case "spot":
        return spotIcon;
      case "park":
        return parkIcon;
      case "shop":
        return shopIcon;
      default:
        return;
    }
  };

  const getInputValue = (e) => {
    const radioValue = e.currentTarget.children[1].value;

    setRadio(radioValue);
    filterSpots(radioValue);
  };

  const onClickIconForDropdown = () => {};

  return (
    <>
      <form className={classes.wrapper}>
        <div
          className={classes.icon}
          onClick={(e) => {
            getInputValue(e);
          }}
        >
          <label className={classes.label}>
            <img src={allIcon} alt="all" />
          </label>
          <input
            id="all"
            type="radio"
            checked={radio === "all"}
            value="all"
            onChange={(e) => {
              setRadio(e.target.value);
              filterSpots(e.target.value);
            }}
          />
        </div>
        <div
          className={classes.icon}
          onClick={(e) => {
            getInputValue(e);
          }}
        >
          <label className={classes.label}>
            <img src={spotIcon} alt="spot" />
          </label>
          <input
            id="spot"
            type="radio"
            checked={radio === "spot"}
            value="spot"
            onChange={(e) => {
              setRadio(e.target.value);
              filterSpots(e.target.value);
            }}
          />
        </div>
        <div
          className={classes.icon}
          onClick={(e) => {
            getInputValue(e);
          }}
        >
          <label className={classes.label}>
            <img src={parkIcon} alt="park" />
          </label>
          <input
            id="park"
            type="radio"
            checked={radio === "park"}
            value="park"
            onChange={(e) => {
              setRadio(e.target.value);
              filterSpots(e.target.value);
            }}
          />
        </div>
        <div
          className={classes.icon}
          onClick={(e) => {
            getInputValue(e);
          }}
        >
          <label className={classes.label}>
            <img src={shopIcon} alt="shop" />
          </label>
          <input
            id="shop"
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

      <div className={classes.wrapper__mobile} onClick={onClickIconForDropdown}>
        <img src={renderIcon()} className={classes.dropdown__icon} />
        <select
          ref={dropDownElement}
          value={radio}
          onChange={(e) => {
            setRadio(e.target.value);
            filterSpots(e.target.value);
          }}
        >
          <option value="all">ALL</option>
          <option value="spot">SPOTS</option>
          <option value="park">PARK</option>
          <option value="shop">SHOP</option>
        </select>
      </div>
    </>
  );
};

export default SpotsFilter;
