import React from 'react';

import './App.css';
import AutoComplete from './components/AutoComplete';

function App() {
  return (
    <div className="search-bar-container">
      <h1>Type and select a country:</h1>
      <AutoComplete />
    </div>
  );
}

export default App;
