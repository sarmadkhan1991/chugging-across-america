import React from 'react';
import Weather from "./Components/Weather/Weather"

import './App.css';
import routes from './routes';

function App() {
  return (
    <div className="App">
      { routes }
      <Weather/>
    </div>
  );
}

export default App;
