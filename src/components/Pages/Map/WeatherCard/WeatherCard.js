import classes from "./WeatherCard.module.css";
import React from "react";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) {
    return <></>;
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <div className={classes.description}>
          {weatherData.weather[0].description}
        </div>
        <div className={classes.degree}>
          {Math.round(weatherData.main.temp - 273.15)}
        </div>
      </div>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt=""
      />
    </div>
  );
};

export default WeatherCard;
