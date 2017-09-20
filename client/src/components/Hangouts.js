import React, {Component} from 'react';
import qs from 'qs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theSpots from './theSpots.js'
import Nav from './Nav.js'
import Auth from './Auth.js'

const navGCPOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export default class NewPlaceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avail: false,
      lat: 0,
      lng: 0,
      loading: true,
      places: [],
      value: null,
    };
  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(this.navGCPSuccess, this.navGCPError, navGCPOptions);
  }

  notify=(message)=>toast(message);

  navGCPSuccess=(pos)=>{
    let crd = pos.coords;
    this.setState({
      lat: crd.latitude,
      lng: crd.longitude
    });
    this.getPlaces()
  }

  navGCPError=(err)=>{
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }


  async getPlaces(){
    let placesArr = [];
    const response = await fetch('https://serenegreen.herokuapp.com/places')
    const responseJson = await response.json()
    placesArr.push(responseJson.park.results, responseJson.campground.results, responseJson.museum.results, responseJson.amusement.results, theSpots)
    placesArr = placesArr.map(placeTypeArr=>placeTypeArr.filter(place=>{
      if(this.state.lat>=place.geometry.location.lat-.002 && this.state.lng>=place.geometry.location.lng-.002 && this.state.lng<=place.geometry.location.lng+.002 && this.state.lat<=place.geometry.location.lat+.002){
        return place
      }
      else {
        return
      }
    }))
    this.setState({places: placesArr});
    this.checkAvail()
  }

  handleChangeValue = (e, index, value) => {
    this.setState({value})
  };

  async submitCheckIn() {
    let reqBody = {
      place_id: this.state.value,
      user_id: document.cookie.split('=')[1]
    }
    const response = await fetch('https://serenegreen.herokuapp.com/checkin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify(reqBody)
    }).then(()=>{
      this.notify( `Woo, you checked-in!`)
      setTimeout(() => {
        this._reactInternalInstance._context.router.history.push('/leaderboard', null);}, 2000);
    })
  }

  checkAvail = () => {
    const available = this.state.places.map(innerArr => {
      if(innerArr.length>0){
        return innerArr
      }
    })
    let result = available.length > 0
    this.setState({
      avail: result,
      loading: false
    })
  }

  render() {
    return (
      <div>
        {
        document.cookie
        ?
        <div>
        <Nav />
        <h1 style={{color:'white',textAlign:'center'}}>Hangouts</h1>
        <MuiThemeProvider>
        {this.state.loading?
          <h4
            style={{
              color: 'white',
              textAlign: 'center',
              marginTop: '75vh',
            }}
          >
            Loading...
          </h4>
          :
          <div
            style={{
              textAlign:'center',
              color:'white',
              padding: '3%',
            }}
          >
            <ToastContainer
              position='top-right'
              type='default'
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
            />
            {this.state.avail
            ?
            <div>
              <h3>Select Location</h3>
              <SelectField
                value={this.state.value}
                onChange={this.handleChangeValue}
                style={{background:'white'}}
              >
                {this.state.places.map(placeArr => placeArr.map(place =>(
                  <MenuItem
                    key={place.id}
                    value={place.id}
                    primaryText={place.name}
                    style={{textColor:'black'}}
                  />
                )))}
              </SelectField>
              <br/>
              <input
                type='submit'
                value='Submit'
                onClick={()=>this.submitCheckIn()}
                style={{
                  color: 'white',
                  background: 'rgb(65,93,93)'
                }}
              />
            </div>
            :
            <h4>Sorry no nearby hangouts :(</h4>
            }
          </div>}
        </MuiThemeProvider>
        </div>
        :
        <Auth />
      }
      </div>
    );
  }
}
