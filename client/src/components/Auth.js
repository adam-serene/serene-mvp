import React from 'react';
import qs from 'qs';

export default class Auth extends React.Component{
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
    const response = await fetch('https://serene-green.herokuapp.com/login',
    // const response = await fetch('http://localhost:5000/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify(this.state)
    })
    let pathEnd = response.url.slice(34);
    console.log(pathEnd);
    this._reactInternalInstance._context.router.history.push(pathEnd, null);
   }

  render(){
    return(
      <div>
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
      </div>
    );
  }
}
