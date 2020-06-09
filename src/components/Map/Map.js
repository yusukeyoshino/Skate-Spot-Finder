import React,{Fragment,useState} from 'react';
import ReactMapGL,{Marker} from 'react-map-gl';
import * as parkData from '../../data/skatespot.json';
import classes from './Map.module.css';

const Map = (props) => {
  const [viewport,setViewport] = useState({
      width: '90%',
      height: 1000,
      latitude: 35.676073,
      longitude: 139.771753,
      zoom: 12,
  });

  return(
    <div style={{'margin': '0 auto'}}>
        <ReactMapGL
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={"mapbox://styles/yusukeyoshino/ckaqtjf8u1a0g1io2vgm7nsp9"}
        >
          {props.results.map(spot => (
            <Marker
             key={spot.attributes.PARK_ID}
             latitude={spot.geometry.x}
             longitude={spot.geometry.y}>
               <button>
                 <img src="/skateboard.svg" alt="skate-logo"/>
               </button>

            </Marker>
          ))}
        </ReactMapGL>
    </div>
    );
}

export default Map;