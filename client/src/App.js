import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Auth from './components/Auth';
import GoogleMap from './components/GoogleMap';
// import Progress from './components/Progress';
import Signup from './components/Signup';
import NewPlaceForm from './components/SubmitPlace.js'
import Leaderboard from './components/Leaderboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.symbol.png'

const Login = ({match}) => (
  <div>
    <Auth />
    <Link to='/signup'>
      <i className='fa fa-user-plus fa-2x' aria-hidden='true'></i>
      <p className='signup'>or... Signup here!</p>
    </Link>
    <Route
      path={match.url + '/signup'}
      component={Signup}
    />
  </div>
)

// const NewUser = () => (
//   <div>
//     <Signup />
//   </div>
// )

// const MapPlaces = () => (
//   <div>
//     <GoogleMap />
//   </div>
// )


// const Fitness = () => (
//   <div>
//     <nav>
//     <Link to='/addpoint'><i className='fa fa-map-marker fa-2x' aria-hidden='true'></i></Link>
//     <Link to='/mapplaces'><i className='fa fa-map-o fa-2x' aria-hidden='true'></i></Link>
//     <Link to='/fitness'><i className='fa fa-trophy fa-3x' aria-hidden='true'></i></Link>
//     </nav>
//     <Progress />
//   </div>
// )

// const AddPoint = () => (
//   <div>
//     <nav>
//     <Link to='/addpoint'><i className='fa fa-map-marker fa-3x' aria-hidden='true'></i></Link>
//     <Link to='/mapplaces'><i className='fa fa-map-o fa-2x' aria-hidden='true'></i></Link>
//     <Link to='/fitness'><i className='fa fa-trophy fa-2x' aria-hidden='true'></i></Link>
//     </nav>
//     <NewPlaceForm />
//   </div>
// )

const LeaderboardComp = () => (
  <MuiThemeProvider >
      <Leaderboard />
  </MuiThemeProvider>
)

const CheckinComp = () => (
  <MuiThemeProvider>
    <NewPlaceForm />
  </MuiThemeProvider>
)

const App = () => (
  <div className='app'>
    <div className='app-header'>
      <Link to='/'>
        <img src={logo} className='app-logo' alt='logo' />
      </Link>
      <h2 className='app-name'>Serene</h2>
      <div className='feature-links'>
        <Link to='/checkin' className='feature-link'>
          <i className='fa fa-map-marker fa-2x' aria-hidden='true'></i>
        </Link>
        <Link to='/map' className='feature-link'>
          <i className='fa fa-map-o fa-2x' aria-hidden='true'></i>
        </Link>
        <Link to='/leaderboard' className='feature-link'>
          <i className='fa fa-trophy fa-2x' aria-hidden='true'></i>
        </Link>
      </div>
    </div>

    <div className='app-body'  style={{display:'inline-block',width:'100vw'}}>
      <Route exact path='/' component={Login}/>
      <Route path='/map' component={GoogleMap}/>
      <Route path='/leaderboard' component={LeaderboardComp}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/checkin' component={CheckinComp}/>
    </div>
  </div>
)

export default App;
