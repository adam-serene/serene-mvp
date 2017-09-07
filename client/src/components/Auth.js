import React from 'react';
import qs from 'qs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default class Auth extends React.Component{
  constructor(props) {
   super(props);
   this.state = {
     username: '',
     password: ''
   };
   this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange=(event)=>{
     const value = event.target.value;
     const name = event.target.name;
     this.setState({
       [name]: value
     });
   }

  notify=(message)=>toast(message);

  async handleSubmit(event) {
    event.preventDefault();
    this.notify(`Hey, ${this.state.username}. You down? We'll see....`);
    const response = await fetch('https://serene-green.herokuapp.com/login',
    // const response = await fetch('http://localhost:5000/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify(this.state)
    })
    if (response.status !== 200) return this.notify(`Could not login: ${this.state.username}`);
    const data = await response.json();
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
          <h2>Login</h2>
          <p><label>
            Username:
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          </label></p>
          <p><label>
            Password:
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </label></p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
