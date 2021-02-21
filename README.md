# Tokyo Street Spot Finder

Demo Web page URL https://potyskateboards.com

![tokyo street spot finder](https://github.com/yusukeyoshino/portfolio/blob/master/src/images/ezgif.com-gif-maker.gif?raw=true)<br/>



## Overview

Skate spots finder using React, Mapbox API and Firebase.


## How to use
- Drag around the map and push "Search this area" button.
- Feching skate spots within 50km from center using geohash query.
- Click icons on map then the corresponding spot information card  moves to upfront.
- Click spot information card then the spot moves to the center of the map.
- Filtering spots by changing spot types in the header.

## Features
- Spots database is stored in Firebase.
- Download iOS app to upload your local spot https://apps.apple.com/us/app/poty/id1551551068

## Structure
    .
    ├── index.js (root file) 
    ├── App.js (routing by React Router)
    ├── actions (Redux actions)
    ├── reducers (Redux reducers)
    └── components 
          ├── Pages (components corresponding each route)
          ├── Layout (wrapper component to render mutual components (SideDrawer, Header, Footer))
          └── UI(reusable component (modal,backdrop))
 



## Dependencies
Libraries:
- React
- React Hooks
- React Router
- React Map gl
- Redux
- Redux Thunk
- Firebase
- CSS Module
