import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import NewPlaceForm from './SubmitPlace.js'
import qs from 'qs';


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 40.0150,
        lng: -105.2705
      },
      places: [
        {id: 1,
        user_id: 1,
        description: 'Postcard Point',
        lat: 39.938945153644035,
        lng: -105.23653507232666,
        position: {
          lat: 39.938945153644035,
          lng: -105.23653507232666
        },
        visits_this_month: 2},

        {id: 2,
        user_id: 1,
        description: 'Eldorado Spring Resort & Pool',
        lat: 39.93183522069995,
        lng: -105.27945578098297,
        position: {
          lat: 39.93183522069995,
          lng: -105.27945578098297
        },
        visits_this_month: 20},
      ],
      showingDPInfoWindow: false,
      droppedPlace: {
        title: ''
      },
      droppedPin: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.mapClicked = this.mapClicked.bind(this);
    this.centerMoved = this.centerMoved.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.dropPin = this.dropPin.bind(this);
    this.handleSubmitPin = this.handleSubmitPin.bind(this);
  }

  // async fetchPlaces(mapProps, map) {
  //   const response = await fetch('https://serene-green.herokuapp.com/places');
  //   // const response = await fetch('http://localhost:5000/places');
  //   const places = await response.json()
  //   this.setState({
  //     places: places
  //   });
  // }

  mapClicked(mapProps, map, clickEvent) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  centerMoved() {
    let that = this;
    function navGCPSuccess(pos){
      let crd = pos.coords;
      that.setState({
        currentLocation: {
          lat: crd.latitude,
          lng: crd.longitude
        }
      }, ()=>{console.log(that.state);});
    }

    function navGCPError(err){
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    const navGCPOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(navGCPSuccess, navGCPError, navGCPOptions);
  }

  onMarkerClick(mapProps, marker, e){
    this.setState({
      selectedPlace: mapProps,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  windowHasOpened(mapProps, marker, e){
    console.log('wHO', this.props);
  }

  dropPin(mapProps, marker, e){
    this.setState({
      droppedPlace: mapProps,
      droppedPin: marker,
      showingDPInfoWindow: true
    });
    console.log(this.state.droppedPlace);
  }

  async handleSubmitPin(event){
    event.preventDefault();
    alert('Adding: ' + this.state.droppedPin.title);
    console.log(this.state.droppedPin);

    const response = await fetch('https://serene-green.herokuapp.com/places',
    // const response = fetch('http://localhost:5000/places',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify(this.state.droppedPin)
    })
    alert(response);
  }


  render() {
    const style = {
      width: '100vw',
      height: '80vh'
    }

    return (
      <div style={style}>
        <Map google={this.props.google}
          onReady={this.fetchPlaces}
          onClick={this.mapClicked}
          onDragend={this.centerMoved}
          style={style}
          initialCenter={this.state.currentLocation}
          zoom={13}
          clickableIcons={false}
        >

        <Marker
          name="youAreHere"
          position={this.state.currentLocation}
          onClick={this.dropPin}
        />

        <InfoWindow
          marker={this.state.droppedPin}
          visible={this.state.showingDPInfoWindow}
          onOpen={this.windowHasOpened}
        >
          <NewPlaceForm
            droppedPin={this.state.droppedPin}
            droppedPlace={this.state.droppedPlace}
            handleSubmitPin={this.handleSubmitPin}
          />
        </InfoWindow>

        {this.state.places.map(place =>
          <Marker
            key={place.id}
            title={place.description}
            name={place.description}
            position={place.position}
            url={place.url}
            onClick={this.onMarkerClick}
          />
        )}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.title}</h1>
              <img src={this.state.selectedPlace.url} alt=""/>
            </div>
        </InfoWindow>

        </Map>
      </div>
    );
  }
} //closes MapContainer

export default GoogleApiWrapper({
  // apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  apiKey: 'AIzaSyA3CgIdPGgKcOe9JAax8ZtChsomwWYSzu8'
})(MapContainer)
