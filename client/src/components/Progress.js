import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Progress extends Component{
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

  async checkFitbit(){
    const response = await fetch('https://serene-green.herokuapp.com/auth/fitbit/');
    const data = await response.json();
    this.notify(`ROCK ON, ${data.username.toUpperCase()}!! Let's get FIT`);
    this.setState({
      fitbitToken: data.fitbitToken
    })
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

export default Progress;
