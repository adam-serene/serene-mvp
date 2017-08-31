import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Signup from './Signup';

// const NewUser = () => {
//   <div>
//     <Signup />
//   </div>
// }

class Auth extends Component{
  constructor(props) {
   super(props);
   this.state = {
     username: '',
     password: ''
   };
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
     const value = event.target.value;
     const name = event.target.name;
     this.setState({
       [name]: value
     });
   }

   async handleSubmit(event) {
    alert('Attempting to login: ' + this.state.username);
    event.preventDefault();
    // const response = await fetch('http://serene-green.herokuapp.com/login', {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
     const json = await response.json();

   }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <p><label>
          Username:
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        </label></p>
        <p><label>
          Password:
          <input name="password" type="text" value={this.state.password} onChange={this.handleChange} />
        </label></p>
        <input type="submit" value="Submit" />
        <Router>
          <div>
            <Link to="/newuser">
            <p>or... Register here!</p>
            <i className="fa fa-user-plus fa-2x" aria-hidden="true"></i>
            </Link>
            <Route path="/newuser" component={Signup}/>
          </div>
        </Router>
      </form>
    );
  }
}

export default Auth;
