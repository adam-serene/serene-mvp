import React, { Component } from 'react';
import Routing from './components/Router.js';
// import Map from './components/Map.js';


class App extends Component {
  state = {
    fitbitToken: ''
  }
  componentDidMount(){
    this.checkFitbit();
  }

  checkFitbit = () => {
    fetch('/auth/fitbit')
    .then(res => res.json())
    .then(fitbitToken => this.setState({fitbitToken}));
  }

  render() {
    return (
      <div className="App">
        <Routing />
      </div>
    );
  }
}

export default App;
