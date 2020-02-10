// Dependencies
import React from 'react';

// Components
import CreateTrip from '../CreateTrip/CreateTrip';

// CSS
import './Home.css';

function Home() {
  return (
    <div>
      <main>
        <h1>Welcome.</h1>
        <h2>Start chugging</h2>
        <CreateTrip />
      </main>
    </div>
  );
}

export default Home;