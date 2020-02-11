// Dependencies
import React from 'react';

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