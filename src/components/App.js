import React,{Fragment,useState,useEffect} from 'react';
import Header from './Header/Header';
import Map from './Map/Map';
import SideDrawer from './SideDrawer/SideDrawer';
import * as parkData from '../data/skatespot.json';

const App = () => {

  const [allParkData,setAllParkData] = useState(parkData);
  const [toggleSideDrawer,setToggleSideDrawer] = useState(false);
  const [searchResults,setSearchResults] = useState(parkData.default.features);


  const toggleSideDrawerHandler = () => {
    setToggleSideDrawer(!toggleSideDrawer);
    console.log(toggleSideDrawer);
  };

  const inputValueHandler = (event) => {
     const getResults = parkData.default.features.filter(park => {
         return park.attributes.SPOTNAME.toLowerCase().includes(event.target.value)
  })
    setSearchResults(getResults);
  };


  return (
    <Fragment>
      <Header clicked={toggleSideDrawerHandler}/>
      <SideDrawer results={searchResults} isOpened={toggleSideDrawer} inputChange={inputValueHandler}/>
      <Map results={searchResults}/>
    </Fragment>
  );
}

export default App;
