import React, { useState, useEffect } from "react";
import Map from "./Map/Map";
import About from "./About/About";
import Layout from "./Layout/Layout";
import AddSpot from "../components/AddSpot/AddSpot";
import Modal from "./UI/Modal/Modal";
import SpotInfo from "../components/SpotInfo/SpotInfo";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const [spotInfo, setSpotInfo] = useState(null);

  // const toggleSideDrawerHandler = () => {
  //   setToggleSideDrawer(!toggleSideDrawer);
  //   console.log(toggleSideDrawer);
  // };

  // const spotDetail = (fields) => {
  //   setSpotInfo(fields);
  //   setIsSpotDetail(true);
  // };

  // const removeModal = () => {
  //   setIsSpotDetail(false);
  // };

  const renderSpotInfo = () => {
    return <div>{spotInfo.spotName}</div>;
  };

  return (
    <>
      <Router>
        <Layout>
          <Route path="/" exact component={Map} />
          <Route path="/about" component={About} />
          <Route path="/addspot" component={AddSpot} />
        </Layout>
      </Router>
    </>
  );
};

export default App;
