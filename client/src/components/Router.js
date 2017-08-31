import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './Router.css';
import Form from './Form'
import GoogleMap from './GoogleMap'
import Progress from './Progress'

const Login = () => (
  <div>
    <Form />
  </div>
)

const MapPlaces = () => (
  <div>
    <GoogleMap />
  </div>
)

const Fitness = () => (
  <div>
    <Progress />
  </div>
)

const Routing = () => (
  <Router>
    <div className="Home-header">
      <Link to="/map"><i className="fa fa-map-o fa-2x" aria-hidden="true"></i></Link>
      <img src="https://scontent-dft4-1.cdninstagram.com/t51.2885-19/s320x320/17438844_398287633860003_5443105418219880448_a.jpg" className="Home-logo" alt="logo" />
      <Link to="/fitness"><i className="fa fa-trophy fa-2x" aria-hidden="true"></i></Link>
      <h2 className="Home-name">Serene</h2>
      <Route exact path="/" component={Login}/>
      <Route path="/map" component={MapPlaces}/>
      <Route path="/fitness" component={Fitness}/>
    </div>
  </Router>
)

export default Routing;
