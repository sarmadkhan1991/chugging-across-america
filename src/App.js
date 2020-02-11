import React from 'react';

import './App.css';
import routes from './routes';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
      { routes }
      </main>
      <footer>
        &copy; 2020 All rights reserved by Chugging Across America
      </footer>
    </div>
  );
}

export default App;
