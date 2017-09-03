import React, { Component } from 'react';

class Progress extends Component{
  state = {
    fitbitToken: ''
  }
  componentDidMount(){
    this.checkFitbit();
  }

  checkFitbit = () => {
    fetch('https://serene-green.herokuapp.com/auth/fitbit/')
    .then(res => res.json())
    .then(fitbitToken => this.setState({fitbitToken}))
  }

  render(){
    return(
      <div>
        <h3> Get Fit! {this.state.fitbitToken}</h3>
      </div>
    );
  }
}

export default Progress;
