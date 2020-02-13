// Dependencies
import React from 'react';
import { Link } from "react-router-dom";

// Components
import CreateTrip from '../CreateTrip/CreateTrip';

// CSS
import './Home.css';

function Home() {
  return (
    <div className="content-container">
        <h1>Welcome.</h1>
        <h2>Start chugging</h2>
        <CreateTrip />
    </div>
  );
}

export default Home;