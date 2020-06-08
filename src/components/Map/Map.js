import React,{Component,Fragment} from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component{

  state = {
    viewport: {
      width: '90%',
      height: 1000,
      latitude: 35.676073,
      longitude: 139.771753,
      zoom: 12,
    }
  };

  render() {
      return(
        <div style={{'margin': '0 auto'}}>
            <ReactMapGL
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({viewport})}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            mapStyle={"mapbox://styles/yusukeyoshino/ckaqtjf8u1a0g1io2vgm7nsp9"}
            />
    </div>
      );
  }
}

export default Map;