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

   async handleSubmit(event) {
    alert('Creating new user: ' + this.state.username);
    event.preventDefault();
    // const response = await fetch('http://serene-green.herokuapp.com/login', {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
     const json = await response.json();
     this.setState({token: json})
   }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          <p><label>
            Username:
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input name="password" type="text" value={this.state.password} onChange={this.handleChange} />
          </label></p>
          <p><label>
            Full Name:
            <input name="full_name" type="text" value={this.state.full_name} onChange={this.handleChange} />
          </label>
          <label>
            Email:
            <input name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          </label></p>
          <p><label>
            Birthday:
            <input name="username" type="date" value={this.state.birthday} onChange={this.handleChange} />
          </label></p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Signup;
