import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <div>
        <nav className="#212121 grey darken-4">
          <div className="nav-wrapper">
            <p className="brand-logo" style={{marginLeft:"5px"}}>Travelogue</p>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="/">Visited</a></li>
              <li><a href="/addplace">Add Place</a></li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li><a href="/">Visited</a></li>
          <li><a href="/addplace">Add Place</a></li>
        </ul>
      </div>
    );
  }
}