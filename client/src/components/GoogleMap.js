import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './styles/Map.css';
import axios from 'axios';


const navGCPOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const config = {
  'Access-Control-Request-Method': 'GET',
  'Access-Control-Allow-Origin': 'serenegreen.herokuapp.com',
};

const theSpots = [
  {
    id: 1,
    name: 'Spot 1',
    geometry: {
      location: {
        lat: 39.999488,
        lng: -105.308945,
      }
    },
    opening_hours: {
      open_now: true
    },
    rating: 4.3,
  },
  {
    id: 2,
    name: 'Spot 2',
    geometry: {
      location: {
        lat: 40.004286,
        lng: -105.305981,
      }
    },
    opening_hours: {
      open_now: true
    },
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Spot 3',
    geometry: {
      location: {
        lat: 40.001731,
        lng: -105.307875,
      }
    },
    opening_hours: {
      open_now: true
    },
    rating: 4.2,
  },
  {
    id: 4,
    name: 'Spot 4',
    geometry: {
      location: {
        lat: 40.005359,
        lng: -105.307865,
      }
    },
    opening_hours: {
      open_now: true
    },
    rating: 4.8,
  },
  {
    id: 5,
    name: 'Spot 5',
    geometry: {
      location: {
        lat: 40.00365,
        lng: -105.300807,
      }
    },
    opening_hours: {
      open_now: true
    },
    rating: 4.7,
  },
]


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 40.0150,
        lng: -105.2705
      },
      places: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      open:false,
    };
    // this.fetchPlaces = this.fetchPlaces.bind(this);
  }

  navGCPSuccess=(pos)=>{
    let crd = pos.coords;
    this.setState({
      currentLocation: {
        lat: crd.latitude,
        lng: crd.longitude
      }
    });
  }

  navGCPError=(err)=>{
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // async fetchPlaces(mapProps, map){
  //   const response = await fetch('https://serene-green.herokuapp.com/places');
  //   const places = await response.json()
  //   // this.setState({
  //   //   places: places
  //   // });
  // }

  mapClicked=(mapProps, map, clickEvent)=>{
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  centerMoved=()=>{
    navigator.geolocation.getCurrentPosition(this.navGCPSuccess, this.navGCPError, navGCPOptions);
  }

  onMarkerClick=(mapProps, marker, e)=>{
    this.setState({
      selectedPlace: mapProps,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  async componentWillMount(){
    navigator.geolocation.getCurrentPosition(this.navGCPSuccess, this.navGCPError, navGCPOptions);
    let placesArr = [];
    // const parkData = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=park+in+boulder&key=AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs')
    // const parkDataJson = await parkData.json()
    axios.post('https://maps.googleapis.com/maps/api/place/textsearch/json?query=park+in+boulder&key=AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs',config)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // const campgroundData = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=campground+in+boulder&key=AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs')
    // const campgroundDataJson = await campgroundData.json()
    // const museumData = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=museum+in+boulder&key=AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs')
    // const museumDataJson = await museumData.json()
    // const amusementparkData = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=amusement_park+in+boulder&key=AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs')
    // const amusementparkDataJson = await amusementparkData.json()
    // placesArr.push(parkDataJson.results, campgroundDataJson.results, museumDataJson.results, amusementparkDataJson.results, theSpots)
    // const response = await fetch('http://serenegreen.herokuapp.com/places',
    // {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //   }
    //   // body: qs.stringify(reqBody)
    // })
    // console.log(response.json());
    // const placesArr = await response.json
    this.setState({places: placesArr});
  }

  // checkIn = () => {
  //   console.log('hittting');
  // }

  render() {
    const style = {
      width: '100vw',
      height: '92vh'
    };

    // async function getPhoto(ref) {
    //   console.log(ref);
    //   const photo = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs`)
    //   const photoJson = await photo.json()
    //   console.log(photo);
    // }

    return (
        <Map google={this.props.google}
          onReady={this.fetchPlaces}
          onClick={this.mapClicked}
          onDragend={this.centerMoved}
          style={style}
          initialCenter={this.state.currentLocation}
          zoom={13}
          clickableIcons={false}
          mapType={'hybrid'}
        >

        {this.state.places.map(placeArr =>
          placeArr.map(place =>
          <Marker
            key={place.id}
            title={place.name}
            name={place.name}
            rating={place.rating}
            open={place.opening_hours?place.opening_hours.open_now:null}
            position={place.geometry.location}
            url={null}
            onClick={this.onMarkerClick}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div style={{width: '25vh'}}>
              <h4 style={{textAlign: 'center'}}>
                {this.state.selectedPlace.title}
              </h4>
              <h6 style={{textAlign: 'center'}}>
                Open now: {this.state.selectedPlace.open?'Yes':'No'}
              </h6>
              <h6 style={{textAlign: 'center'}}>
                Rating: {this.state.selectedPlace.rating}/5
              </h6>
              <img
                className="infowindow-img"
                style={{width: '100%'}}
                src={''}
                alt=""/>
            </div>
        </InfoWindow>
      </Map>
    );
  }
} //closes MapContainer

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs'

})(MapContainer)
