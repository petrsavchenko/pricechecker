import React, { Component } from 'react';
// import { API_URL } from './../constants';
// import axios from 'axios';
import { Link } from "react-router-dom";

class Crawler extends Component {
  render() {
    return (
      // Bootstrap form which will show list of your crawlers
      <div className="container">
        <Link to="/home">Home Page</Link>
      </div>
    );
  }
}

export default Crawler;
