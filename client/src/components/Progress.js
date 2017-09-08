import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/Progress.css';

// var windowObjectReference;
const urlHerokuCallback = "https://www.fitbit.com/login?disableThirdPartyLogin=true&redirect=%2Foauth2%2Fauthorize%3Fclient_id%3D228QJJ%26redirect_uri%3Dhttps%253A%252F%252Fserene-green.herokuapp.com%252Fauth%252Ffitbit%252Fcallback%26response_type%3Dcode%26scope%3Dactivity%2Bheartrate%2Blocation%2Bprofile%26state";
// const urlLocalhostCallback = "https://www.fitbit.com/login?disableThirdPartyLogin=true&redirect=%2Foauth2%2Fauthorize%3Fclient_id%3D228QJJ%26redirect_uri%3Dhttp%253A%252F%252Flocalhost:5000%252Fauth%252Ffitbit%252Fcallback%26response_type%3Dcode%26scope%3Dactivity%2Bheartrate%2Blocation%2Bprofile%26state";
const popupName = "Fitbit_OAuth2";
const windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

export default class Progress extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentSteps: 0,
      currentGoal: 1
    }
    this.getResults = this.getResults.bind(this);
  }
  componentDidMount(){
    this.checkFitbit();
  }

  notify=(message)=>toast(message);

  openRequestedPopup=(path, name, features)=>{
    window.open(path, name, features);
  }

  async getResults(){
    const response = await fetch('https://serene-green.herokuapp.com/fitness/');
  // const response = await fetch('http://localhost:5000/auth/fitbit/');
    const data = await response.json();
    console.log(data);
    this.setState({
      currentSteps: data.currentSteps,
      currentGoal: data.currentGoal
    })
    this.notify(`ROCK ON, ${data.username.toUpperCase()}!! Let's get FIT`);
  }

  checkFitbit(){
    setTimeout(()=>{
      this.openRequestedPopup(urlHerokuCallback, popupName, windowFeatures)
      // this.openRequestedPopup(urlLocalhostCallback, popupName, windowFeatures)
    }, 1500);

    setTimeout(()=>{this.getResults()}, 6500);
  }

  render(){
    return(
      <div>
        <ToastContainer
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <h3> Get Fit! </h3>
        <CircularProgressbar
          initialAnimation={true}
          strokeWidth={12}
          percentage={(this.state.currentSteps / this.state.currentGoal).toPrecision(4)*100}
        />
      </div>
    );
  }
}
