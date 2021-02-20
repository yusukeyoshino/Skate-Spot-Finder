import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Map from "./Pages/Map/Map";
import About from "./Pages/About/About";
import Layout from "./Layout/Layout";
import AddSpot from "./Pages/AddSpot/AddSpot";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TermsAndCondition from "./Pages/TermsAndCondition/TermsAndCondition";
import PrivacyAndPolicy from "./Pages/PrivacyAndPolicy/PrivacyAndPolicy";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

const App = () => {
  const [radio, setRadio] = useState("all");

  return (
    <>
      <Router>
        <Layout radio={radio} setRadio={setRadio}>
          <Route path="/" exact>
            <Map radio={radio} />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/addspot" component={AddSpot} />
          <Route path="/terms-conditions" component={TermsAndCondition} />
          <Route path="/privacy-policy" component={PrivacyAndPolicy} />
        </Layout>
      </Router>
    </>
  );
};

export default App;
