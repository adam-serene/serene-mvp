import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import logo from '../logo.symbol.png'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import qs from 'qs';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment'

export default class Auth extends Component{
  constructor(props) {
   super(props);
   this.state = {
     birthday: null,
     email: '',
     fullname: '',
     loginView: false,
     newpassword: '',
     newusername: '',
     password: '',
     signupView: false,
     username: '',
   };
   this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
   this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
  }

  handleChange=(event)=>{
     const value = event.target.value;
     const name = event.target.name;
     this.setState({
       [name]: value
     });
   }

   handleChangeBirthday = (a, b) => {
     if(moment(b).isSameOrBefore(moment().subtract(21, 'years'), 'day')){
       this.setState({birthday: moment(b).format('YYYY-MM-DD')})
     }
   }

  notify=(message)=>toast(message);

  async handleLoginSubmit(event) {
    event.preventDefault();
    let reqBody = {
      username:this.state.username,
      password:this.state.password,
    }
    const response = await fetch('https://serenegreen.herokuapp.com/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify(reqBody)
    })
    if (response.status !== 200) return this.notify(`Could not login: ${this.state.username}`);
    const data = await response.json();
    this.notify(`Righteous. ${data.username}, welcome to the fun!`);
    let pathEnd = data.url;
    document.cookie = `user=${data.id}`;
    setTimeout(()=>{
      this._reactInternalInstance._context.router.history.push(pathEnd, null);
    }, 1500);
  }

  async handleSignupSubmit(event) {
    event.preventDefault();
    if(this.state.birthday === null){
      this.notify('Sorry you must be atleast 21 years old to enter')
      return
    }
    if(this.state.newusername === ''){
      this.notify('Please enter a username')
      return
    }
    if(this.state.newpassword === ''){
      this.notify('Please enter a password')
      return
    }
    if(this.state.fullname === ''){
      this.notify('Please enter your full name')
      return
    }
    if(this.state.email === ''){
      this.notify('Please enter an email address')
      return
    }
    let reqBody = {
      username:this.state.newusername,
      password:this.state.newpassword,
      fullname:this.state.fullname,
      email:this.state.email,
      birthday:this.state.birthday
    }
    const response = await fetch('https://serenegreen.herokuapp.com/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify(reqBody)
    })
    if (response.status !== 200) return this.notify(`Could not create user: ${this.state.newusername}`);
    const data = await response.json()
    this.notify(`Righteous! Welcome to the fun ${data.username}!`);
    let pathEnd = data.url;
    document.cookie = `user=${data.id}`;
    setTimeout(()=>{
      this._reactInternalInstance._context.router.history.push(pathEnd, null);}
      , 1500);
   }

   handleResetBrowser = (pathEnd) => {
     this.notify('Logged Out!');
     document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
     setTimeout(() => {
       this._reactInternalInstance._context.router.history.push(pathEnd, null);}, 100);
   }

   handleHome = (pathEnd) => {
     setTimeout(() => {
       this._reactInternalInstance._context.router.history.push(pathEnd, null);}, 100);
   }

  handleLoginView = () => {
    let newView = !this.state.loginView
    this.setState({loginView: newView, signupView: false})
  }

  handleSignupView = () => {
    let newView = !this.state.signupView
    this.setState({signupView: newView, loginView: false})
  }

  render(){
    return(
      <div
        style={{
          textAlign: 'center',
          color: 'white',
          padding: '5%',
        }}
      >
        <ToastContainer
          position='top-right'
          type='default'
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <img src={logo} alt='' style={{height:'20%',width:'20%'}}/>
        {
          this.state.loginView || this.state.signupView
          ?
          null
          :
          <div>
            <h2>
            EMPLOYEE ENGAGEMENT SOFTWARE
            </h2>
            {
              document.cookie
              ?
              <div>
              <button
                onClick={() => this.handleHome('/hangouts')}
                style={{
                  background: 'transparent',
                  border: 'transparent',
                }}
              >
                <i
                  className='fa home fa-map-marker fa-2x'
                  aria-hidden='true'
                  style={{
                    color:'white'
                  }}
                >
                </i>
                <br/>
                Hangouts
              </button>
              <button
                onClick={() => this.handleHome('/home')}
                style={{
                  background: 'transparent',
                  border: 'transparent',
                }}
              >
                <i
                  className='fa home fa-map-o fa-2x'
                  aria-hidden='true'
                  style={{
                    color:'white'
                  }}
                >
                </i>
                <br/>
                Home
              </button>
              <button
                onClick={() => this.handleHome('/leaderboard')}
                style={{
                  background: 'transparent',
                  border: 'transparent',
                }}
              >
                <i
                  className='fa fa-trophy fa-2x'
                  aria-hidden='true'
                  style={{
                    color:'white'
                  }}
                >
                </i>
                <br/>
                Leaderboard
              </button>
              <button
                onClick={() => this.handleResetBrowser('/')}
                style={{
                  background: 'transparent',
                  border: 'transparent',
                }}
              >
                <i
                  className='fa fa-sign-out fa-2x'
                  aria-hidden='true'
                  style={{
                    color:'white'
                  }}
                >
                </i>
                <br/>
                Logout
              </button>
              </div>
              :
              <div style={{padding:'5%'}}>
                <button
                  onClick={()=>this.handleLoginView()}
                  style={{
                    background: 'transparent',
                    border: 'transparent',
                  }}
                >
                  <i
                    className='fa fa-sign-in fa-2x'
                    aria-hidden='true'
                    style={{
                      color:'white',
                    }}
                  >
                  </i>
                  <br/>
                  LOGIN
                </button>
                 {' or '}
                <button
                  onClick={()=>this.handleSignupView()}
                  style={{
                    background: 'transparent',
                    border: 'transparent',
                  }}
                >
                  <i
                    className='fa fa-user-plus fa-2x'
                    aria-hidden='true'
                    style={{
                      color:'white',
                    }}
                  >
                  </i>
                  <br/>
                  SIGNUP
                </button>
              </div>
            }
            <h4>
            Wellness platform for increasing workplace productivity through a healthy lifestyle.
            </h4>
          </div>
        }
        {this.state.loginView
          ?
          <form
            onSubmit={this.handleLoginSubmit}
            style={{
            }}
          >
            <h2>Login</h2>
            <label>Username</label>
            <p>
              <input
                name='username'
                type='text'
                value={this.state.username}
                onChange={this.handleChange}
              />
            </p>
            <label>Password</label>
            <p>
              <input
                name='password'
                type='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
            </p>
            <p>
              <input
              type='submit'
              value='Submit'
              style={{
                color:'white',
                background:'rgb(65,93,93)',
                margin: '2%'
              }}
              />
              <input
              type='button'
              value='Cancel'
              onClick={()=>this.handleLoginView()}
              style={{
                color:'white',
                background:'rgb(65,93,93)',
                margin: '2%'
              }}
              />
            </p>
          </form>
          :
          null
        }
        {this.state.signupView
        ?
        <div
          style={{
            textAlign:'center',
            color:'white',
          }}>
          <ToastContainer
            position="top-right"
            type="default"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
          <form
            onSubmit={this.handleSignupSubmit}
            style={{width: '145px', margin: 'auto',}}
          >
            <h2>Register</h2>
            <label>Username</label>
            <p>
              <input
                name="newusername"
                type="text"
                value={this.state.newusername}
                onChange={this.handleChange}
              />
            </p>
              <label>Password</label>
            <p>
              <input
                name="newpassword"
                type="text"
                value={this.state.newpassword}
                onChange={this.handleChange}
              />
            </p>
            <label>Full Name</label>
            <p>
              <input
                name="fullname"
                type="text"
                value={this.state.full_name}
                onChange={this.handleChange}
              />
            </p>
              <label>Email</label>
            <p>
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </p>
            <label>Birthday</label>
            <MuiThemeProvider >
              <DatePicker
                hintText="Enter a birthday"
                openToYearSelection={true}
                onChange={this.handleChangeBirthday}
                inputStyle={{
                  background: 'white',
                }}
                textFieldStyle={{width: '150px', height: '30px'}}
                underlineStyle={{display: 'none'}}
              />
            </MuiThemeProvider>
            <br/>
            <input
            type='submit'
            value='Submit'
            style={{
              color:'white',
              background:'rgb(65,93,93)',
              margin: '2%'
            }}
            />
            <input
            type='button'
            value='Cancel'
            onClick={()=>this.handleSignupView()}
            style={{
              color:'white',
              background:'rgb(65,93,93)',
              margin: '2%'
            }}
            />
          </form>
        </div>
        :
        null
        }
      </div>
    );
  }
}
