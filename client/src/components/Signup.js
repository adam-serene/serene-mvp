import React, { Component } from 'react';
import qs from 'qs';

class Signup extends Component{
  constructor(props) {
   super(props);
   this.state = {
     username: '',
     password: '',
     full_name: '',
     email: '',
     birthday: new Date((Date.now()-662695446000)).toUTCString()
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
    const response = await fetch('http://localhost:5000/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify(this.state)
    })
    let pathEnd = response.url.slice(22);
    console.log(pathEnd);
    this._reactInternalInstance._context.router.history.push(pathEnd, null);
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
            <input name="username" type="text" value={this.state.birthday} onChange={this.handleChange} />
          </label></p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Signup;