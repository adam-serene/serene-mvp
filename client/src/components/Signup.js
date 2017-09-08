import React, { Component } from 'react';
import qs from 'qs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/Signup.css'

export default class Signup extends Component{
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

  notify=(message)=>toast(message);

  async handleSubmit(event) {
    this.notify(`Creating new user: ${this.state.username}...`);
    event.preventDefault();
    const response = await fetch('https://serene-green.herokuapp.com/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify(this.state)
    })
    if (response.status !== 200) return this.notify(`Could not create user: ${this.state.username}`);
    const data = await response.json()
    this.notify(`Righteous. ${data.username}, welcome to the fun!`);
    let pathEnd = data.url;
    setTimeout(()=>{
      this._reactInternalInstance._context.router.history.push(pathEnd, null);}
      , 1500);
   }

  render(){
    return(
      <div>
        <ToastContainer
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
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
