import React from 'react';
import { Route, Link } from 'react-router-dom';
import Auth from './components/Auth';
import backgroundHero from './landing.background.png'
import Checkin from './components/SubmitPlace.js'
import GoogleMap from './components/GoogleMap';
import Leaderboard from './components/Leaderboard';
import logo from './logo.symbol.png'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

const Login = ({match}) => (
  <div className='login-body'>
    <Auth />
  </div>
)

const LeaderboardComp = () => (
  <MuiThemeProvider >
      <Leaderboard />
  </MuiThemeProvider>
)

const CheckinComp = () => (
  <MuiThemeProvider>
    <Checkin />
  </MuiThemeProvider>
)

const logout = () => {
  document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

const App = () => (
  <div className='app'>
    <div className='app-header'>
      <Link to='/'>
        <img src={logo} className='app-logo' alt='logo' />
      </Link>
      <p className='app-name'>Serene</p>
      {document.cookie?
      <div className='feature-links'>
        <Link to='/checkin' className='feature-link'>
          <i className='fa fa-map-marker fa-2x' aria-hidden='true'></i>
        </Link>
        <Link to='/' className='feature-link'>
          <i className='fa fa-map-o fa-2x' aria-hidden='true'></i>
        </Link>
        <Link to='/leaderboard' className='feature-link'>
          <i className='fa fa-trophy fa-2x' aria-hidden='true'></i>
        </Link>
        <Link to='/' className='feature-link' onClick={()=>logout()}>
          <i className='fa fa-sign-out -o fa-2x' aria-hidden='true'></i>
        </Link>
      </div>:null}
    </div>

    <div className='app-body'  style={{display:'inline-block',width:'100vw'}}>
      <Route exact path='/' component={document.cookie?GoogleMap:Login}/>
      <Route path='/leaderboard' component={LeaderboardComp}/>
      <Route path='/checkin' component={CheckinComp}/>
    </div>
  </div>
)

export default App;
