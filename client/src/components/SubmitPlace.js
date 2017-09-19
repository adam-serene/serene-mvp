import React from 'react';
import qs from 'qs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/SubmitPlace.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const navGCPOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const theSpots = [
  {
    id: 1,
    name: 'spot 1',
    geometry: {
      location: {
        lat: 39.999488,
        lng: -105.308945,
      }
    }
  },
  {
    id: 2,
    name: 'spot 2',
    geometry: {
      location: {
        lat: 40.004286,
        lng: -105.305981,
      }
    }
  },
  {
    id: 3,
    name: 'spot 3',
    geometry: {
      location: {
        lat: 40.001731,
        lng: -105.307875,
      }
    }
  },
  {
    id: 4,
    name: 'spot 4',
    geometry: {
      location: {
        lat: 40.005359,
        lng: -105.307865,
      }
    }
  },
  {
    id: 5,
    name: 'spot 5',
    geometry: {
      location: {
        lat: 40.00365,
        lng: -105.300807,
      }
    }
  },
  {
    id: 6,
    name: 'Galvanize',
    geometry: {
      location: {
        lat: 40.0166305,
        lng: -105.2817439,
      }
    }
  },
]

export default class NewPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      title: '',
      category: 'GO BIG',
      lat: 0,
      lng: 0,
      value: null,
      places: []
    };
    // this.fetchCategories = this.fetchCategories.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async fetchCategories(){
  //   const response = await fetch('https://serene-green.herokuapp.com/categories');
  //   const categories = await response.json()
  //   this.setState({
  //     categories: categories
  //   });
  // }

  handleChange=(event)=>{
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
     });
   }

  notify=(message)=>toast(message);

  // async handleSubmit(event){
  //   event.preventDefault();
  //   this.notify(`Noice! Let's add ${this.state.title} to the map.`);
  //   const response = await fetch('https://serene-green.herokuapp.com/places',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  //       },
  //       body: qs.stringify(this.state)
  //     })
  //   if (response.status !== 200) return this.notify(`Could not add: ${this.state.title} to the map...`);
  //   const data = await response.json()
  //   this.notify(`Thanks! Others are really gonna enjoy ${data.description}!`);
  //   let pathEnd = data.url;
  //   setTimeout(()=>{
  //     this._reactInternalInstance._context.router.history.push(pathEnd, null);}
  //     , 1500);
  // }

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

  componentWillMount(){
    // this.fetchCategories();
    navigator.geolocation.getCurrentPosition(this.navGCPSuccess, this.navGCPError, navGCPOptions);
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
  }

  handleChangeValue = (event, index, value) => this.setState({value});

  async submitCheckIn() {
    let reqBody = {
      place_id: this.state.value,
      user_id: document.cookie.split('=')[1]
    }
    console.log(reqBody);
    const response = await fetch('https://serenegreen.herokuapp.com/checkin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify(reqBody)
    })
    console.log(response.json());
  }

  render() {
    return (
      <div style={{textAlign:'center', color:'white'}}>
        <ToastContainer
          position='top-right'
          type='default'
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <h3>Select Location</h3>
        <SelectField
          value={this.state.value}
          onChange={this.handleChangeValue}
        >
          {this.state.places.map(placeArr => placeArr.map(place =>(
            <MenuItem
              key={place.id}
              value={place.id}
              primaryText={place.name}
            />
          )))}
        </SelectField>
        <input type='submit' value='Submit' onClick={()=>this.submitCheckIn()} style={{color:'white'}}/>
      </div>
    );
  }
}
