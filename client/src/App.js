import React from 'react';
import './App.css';
import {
  Route,
  Link
} from 'react-router-dom';
import Auth from './components/Auth';
import GoogleMap from './components/GoogleMap';
import Progress from './components/Progress';
import Signup from './components/Signup';

const Login = ({match}) => (
  <div>
    <Auth />
    <Link to="/newuser">
      <i className="fa fa-user-plus fa-2x" aria-hidden="true"></i>
      <p>or... Signup here!</p>
    </Link>
    <Route
      path={match.url + '/newuser'}
      component={NewUser}
    />
  </div>
)

const NewUser = () => (
  <div>
    <Signup />
  </div>
)

const MapPlaces = () => (
  <div>
    <nav>
      <Link to="/mapplaces"><i className="fa fa-map-o fa-2x" aria-hidden="true"></i></Link>
      <Link to="/fitness"><i className="fa fa-trophy fa-2x" aria-hidden="true"></i></Link>
    </nav>
    <GoogleMap />
  </div>
)

const Fitness = () => (
  <div>
    <nav>
      <Link to="/mapplaces"><i className="fa fa-map-o fa-2x" aria-hidden="true"></i></Link>
      <Link to="/fitness"><i className="fa fa-trophy fa-2x" aria-hidden="true"></i></Link>
    </nav>
    <Progress />
  </div>
)

const App = () => (
  <div className="Home-header">
    <img src="https://scontent-dft4-1.cdninstagram.com/t51.2885-19/s320x320/17438844_398287633860003_5443105418219880448_a.jpg" className="Home-logo" alt="logo" />
    <h2 className="Home-name">Serene</h2>
    <div id="React-body">
      <Route exact path="/" component={Login}/>
      <Route path="/mapplaces" component={MapPlaces}/>
      <Route path="/fitness" component={Fitness}/>
      <Route path="/newuser" component={NewUser}/>
    </div>
  </div>
)

export default App;
