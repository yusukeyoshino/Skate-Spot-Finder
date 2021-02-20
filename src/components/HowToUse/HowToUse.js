import classes from "./HowToUse.module.css";
import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import demo1 from "../../assets/howtouse_1.gif";
import spotIcon from "../../assets/spot_icon.png";
import shopIcon from "../../assets/shop_icon.png";
import parkIcon from "../../assets/park_icon.png";
import demoPhoto from "../../assets/demo_photo.jpg";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faArrowDown,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const HowToUse = ({ showModal, setShowModal }) => {
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const isVisited = window.localStorage.getItem("isVisited");
    if (isVisited) {
      return;
    } else {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000);
      window.localStorage.setItem("isVisited", true);

      return () => clearTimeout(timer);
    }
  }, []);

  const contents = [
    {
      el: <img src={demo1} className={classes.howto__demo1} alt="" />,
      text: "1. Drag around the map",
    },
    {
      el: (
        <>
          <FontAwesomeIcon
            icon={faArrowDown}
            className={classes.howto__nearby_search_arrow}
          />
          <div className={classes.howto__nearby_search}>search this area</div>
        </>
      ),
      text: "2. Click Search this area",
    },
    {
      el: (
        <>
          <img className={classes.demo_photo} src={demoPhoto} alt="" />
          <div className={classes.icons__wrapper}>
            <div className={classes.icons_container}>
              <img src={spotIcon} alt="" className={classes.icon} />
              <div className={classes.icon_text}>Spot</div>
            </div>
            <div className={classes.icons_container}>
              <img src={parkIcon} alt="" className={classes.icon} />
              <div className={classes.icon_text}>Park</div>
            </div>
            <div className={classes.icons_container}>
              <img src={shopIcon} alt="" className={classes.icon} />
              <div className={classes.icon_text}>Shop</div>
            </div>
          </div>
        </>
      ),
      text: "3. Click spot icons and spot information cards to find locations.",
    },
  ];

  const leftArrow = () => {
    if (pageNumber === 0) {
      return "";
    } else {
      return (
        <div
          className={classes.howto__arrow_left}
          onClick={(prevPageNumber) => setPageNumber(pageNumber - 1)}
        >
          <FontAwesomeIcon icon={faChevronCircleLeft} />
        </div>
      );
    }
  };

  const rightArrow = () => {
    if (pageNumber === 2) {
      return (
        <FontAwesomeIcon
          onClick={() => setShowModal(false)}
          icon={faTimesCircle}
          className={classes.howto__arrow_right}
        />
      );
    } else {
      return (
        <div
          className={classes.howto__arrow_right}
          onClick={(prevPageNumber) => {
            setPageNumber(pageNumber + 1);
            console.log(pageNumber);
          }}
        >
          <FontAwesomeIcon icon={faChevronCircleRight} />
        </div>
      );
    }
  };

  return (
    <Modal show={showModal} remove={() => setShowModal(false)}>
      <div className={classes.howto__wrapper}>
        <FontAwesomeIcon
          icon={faTimesCircle}
          className={classes.remove_modal}
          onClick={() => setShowModal(false)}
        />
        <div className={classes.howto__title}>How to use</div>
        {rightArrow()}
        {leftArrow()}

        <div className={classes.howto__content}>{contents[pageNumber].el}</div>
        <div className={classes.howto__text}>{contents[pageNumber].text}</div>
      </div>
    </Modal>
  );
};

export default HowToUse;
