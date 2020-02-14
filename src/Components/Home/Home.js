// Dependencies
import React from 'react';

// Components
import CreateTrip from '../CreateTrip/CreateTrip';

// CSS
import './Home.css';

function Home() {
  return (
    <div className="home">
        <div className="home-content-container">
          <h1>Welcome.</h1>
          <CreateTrip />
        </div>
    </div>
  );
}

export default Home;