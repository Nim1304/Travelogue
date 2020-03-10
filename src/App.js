import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

import ListPlaces from "./components/listPlace.component";
import AddPlace from "./components/addPlace.component";
import Navbar from "./components/navbar.component";

function App() {
  return (
    <Router>
      <div id="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ListPlaces} />
        <Route path="/addplace" component={AddPlace} /> 
      </div>
    </Router>
  );
}

export default App;
