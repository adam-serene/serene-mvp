import React from 'react';
import { Route, Link } from 'react-router-dom';
import Auth from './components/Auth';
import backgroundHero from './landing.background.png'
import Hangouts from './components/Hangouts.js'
import GoogleMap from './components/GoogleMap';
import Leaderboard from './components/Leaderboard';
import logo from './logo.symbol.png'
import './App.css';

const App = () => (
  <div
    className='app'
  >
    <div
      className='app-body'
      style={{
        display:'inline-block',
        width:'100vw',
        height: '100vh',
      }}
    >
      <Route
        exact path='/'
        component={Auth}
      />
      <Route
        path='/leaderboard'
        component={Leaderboard}
      />
      <Route
        path='/hangouts'
        component={Hangouts}
      />
      <Route
        path='/home'
        component={GoogleMap}
      />
    </div>
  </div>
)

export default App;
