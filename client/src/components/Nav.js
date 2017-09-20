import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.symbol.png'

export default class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return(
      <div
        className='app-header'
      >
        <Link
          to='/'
        >
          <img
            src={logo}
            className='app-logo'
            alt='logo'
          />
        </Link>
        <p
          className='app-name'
        >
          Serene
        </p>
          <div
            className='feature-links'
          >
            <Link
              to='/hangouts'
              className='feature-link'
            >
              <i
                className='fa fa-map-marker fa-2x'
                aria-hidden='true'
              >
              </i>
            </Link>
            <Link
              to='/home'
              className='feature-link'
            >
              <i
                className='fa fa-map-o fa-2x'
                aria-hidden='true'
              >
              </i>
            </Link>
            <Link
              to='/leaderboard'
              className='feature-link'
            >
              <i
                className='fa fa-trophy fa-2x'
                aria-hidden='true'
              >
              </i>
            </Link>
            <Link
              to='/'
              className='feature-link'
              onClick={() => {
                document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
              }
            }
            >
              <i
                className='fa fa-sign-out -o fa-2x'
                aria-hidden='true'
              >
              </i>
            </Link>
          </div>
      </div>
    );
  }
}
