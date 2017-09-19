import React from 'react';
import qs from 'qs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/Auth.css'

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
    const response = await fetch('http://serenegreen.herokuapp.com/login',
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
    document.cookie = `user=${data.id}`;
    setTimeout(()=>{
      this._reactInternalInstance._context.router.history.push(pathEnd, null);}
      , 1500);
  }

  render(){
    return(
      <div>
        <ToastContainer
          position='top-right'
          type='default'
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <form onSubmit={this.handleSubmit}>
          <h4>Login</h4>
          <label>Username:</label>
            <p><input name='username' type='text' value={this.state.username} onChange={this.handleChange} /></p>
          <label>Password:</label>
            <p><input name='password' type='password' value={this.state.password} onChange={this.handleChange} /></p>
          <p><input type='submit' value='Submit' style={{color:'white',background:'rgb(65,93,93)'}} /></p>
        </form>
      </div>
    );
  }
}
