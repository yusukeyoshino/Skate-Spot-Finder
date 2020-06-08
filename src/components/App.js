import React,{Fragment,useState,useEffect} from 'react';
import Header from './Header/Header';
import Map from './Map/Map';
import SideDrawer from './SideDrawer/SideDrawer';

const App = () => {

  const [toggleSideDrawer,setToggleSideDrawer] = useState(false);

  const toggleSideDrawerHandler = () => {
    setToggleSideDrawer(!toggleSideDrawer);
    console.log(toggleSideDrawer);
  }

  return (
    <Fragment>
      <Header clicked={toggleSideDrawerHandler}/>
      <SideDrawer isOpened={toggleSideDrawer} />
      <Map />
    </Fragment>
  );
}

export default App;
