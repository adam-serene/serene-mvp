import React, { Component } from 'react';

class Progress extends Component{
  constructor(props) {
   super(props);
   this.state = {
     fitbitToken: ''
   };
   this.checkFitbit = this.checkFitbit.bind(this);
  }

  componentDidMount(){
    this.checkFitbit();
  }

  checkFitbit = () => {
    // fetch('http://serene-green.herokuapp.com/auth/fitbit')
    fetch('http://localhost:5000/auth/fitbit')
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
