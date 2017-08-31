import React, { Component } from 'react';

class Signup extends Component{
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

   handleSubmit(event) {
     alert('Attempting to login: ' + this.state.username);
     event.preventDefault();
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
      </form>
    );
  }
}

export default Signup;
