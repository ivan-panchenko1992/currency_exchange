import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <h1>Sell</h1>
          <select>
            <option>sell</option>
          </select>
          <input type="text" />
        </div>
        <div className="card">
          <h1>Buy</h1>
          <select>
            <option>
              buy
            </option>
          </select>
          <input type="text" />
        </div>
      </div>
      <div>
        <button type="button">Exchange</button>
      </div>
    </div>
  );
}

export default App;
