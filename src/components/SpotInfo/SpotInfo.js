import React from "react";
import classes from "./SpotInfo.module.css";
import parse from "html-react-parser";

const SpotInfo = ({ info, remove }) => {
  if (!info) {
    return <div></div>;
  }
  const youtubeStartTime = () => {
    const regex = /start=\d{1,}/g;
    const time = parseInt(
      info.youtubeReference.match(regex)[0].replace("start=", "")
    );
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className={classes.main}>
      <p className={classes.title}>{info.spotName}</p>
      <div className={classes.spotImg}>
        <img src={`https://${info.spotImage[0].fields.file.url}`} />
      </div>
      <div className={classes.youtube}>
        {parse(info.youtubeReference)}
        <p>Spot appears at {youtubeStartTime()}</p>
      </div>
      <span>
        Open in{" "}
        <a
          href={`http://www.google.com/maps/place/${info.geometry.lat},${info.geometry.lon}`}
        >
          <span className={classes.mapLink}>Google Map</span>
        </a>
      </span>
      <div onClick={remove} className={classes.back}>
        back to map
      </div>
    </div>
  );
};

export default SpotInfo;
