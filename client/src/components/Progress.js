import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// var windowObjectReference;
const urlHerokuCallback = "https://www.fitbit.com/login?disableThirdPartyLogin=true&redirect=%2Foauth2%2Fauthorize%3Fclient_id%3D228QJJ%26redirect_uri%3Dhttps%253A%252F%252Fserene-green.herokuapp.com%252Fauth%252Ffitbit%252Fcallback%26response_type%3Dcode%26scope%3Dactivity%2Bheartrate%2Blocation%2Bprofile%26state";
const urlLocalhostCallback = "https://www.fitbit.com/login?disableThirdPartyLogin=true&redirect=%2Foauth2%2Fauthorize%3Fclient_id%3D228QJJ%26redirect_uri%3Dhttp%253A%252F%252Flocalhost:5000%252Fauth%252Ffitbit%252Fcallback%26response_type%3Dcode%26scope%3Dactivity%2Bheartrate%2Blocation%2Bprofile%26state";
const popupName = "Fitbit_OAuth2";
const windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

export default class Progress extends Component{
  constructor(props){
    super(props);
    this.state = {
      fitbitToken: ''
    }
    this.checkFitbit = this.checkFitbit.bind(this);
  }
  componentDidMount(){
    this.checkFitbit();
  }

  notify=(message)=>toast(message);

  openRequestedPopup=(path, name, features)=>{
    window.open(path, name, features);
  }

  async checkFitbit(){
    setTimeout(()=>{
      this.openRequestedPopup(urlHerokuCallback, popupName, windowFeatures)
      // this.openRequestedPopup(urlLocalhostCallback, popupName, windowFeatures)
    }, 1500);
    const response = await fetch('https://serene-green.herokuapp.com/auth/fitbit/');
    // const response = await fetch('http://localhost:5000/auth/fitbit/');
    // const data = await response.json();
    // console.log('checkFBdata', data);
    // this.notify(`ROCK ON, ${data.username.toUpperCase()}!! Let's get FIT`);
    // this.setState({
    //   fitbitToken: data.fitbitToken
    // })
    // let pathEnd = data.url;
    // setTimeout(()=>{
    //   this._reactInternalInstance._context.router.history.push(pathEnd, null);}
    //   , 1500);
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
        <h3> Get Fit! {this.state.fitbitToken}</h3>
      </div>
    );
  }
}
