import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://scontent-dft4-1.cdninstagram.com/t51.2885-19/s320x320/17438844_398287633860003_5443105418219880448_a.jpg" className="App-logo" alt="logo" />
          <h2>Serene</h2>
        </div>
        <Map />
      </div>
    );
  }
}

export default App;
