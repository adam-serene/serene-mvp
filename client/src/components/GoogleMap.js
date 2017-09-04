import React from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import qs from 'qs';

const navGCPOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

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
        position: {
          lat: 39.938945153644035,
          lng: -105.23653507232666
        },
        visits_this_month: 2,
        url: 'https://preview.ibb.co/dyXQUF/postcard_point.jpg'},

        {id: 2,
        user_id: 1,
        description: 'Eldorado Spring Resort & Pool',
        position: {
          lat: 39.93183522069995,
          lng: -105.27945578098297
        },
        visits_this_month: 20,
        url: 'http://cdn.onlyinyourstate.com/wp-content/uploads/2016/07/7903904278_ba823d7e02_b.jpg'}
      ],
      showingDPInfoWindow: false,
      droppedPlace: {},
      droppedPin: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.mapClicked = this.mapClicked.bind(this);
    this.navGCPSuccess = this.navGCPSuccess.bind(this);
    this.navGCPError = this.navGCPError.bind(this);
    this.centerMoved = this.centerMoved.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.dropPin = this.dropPin.bind(this);
  //   this.renderChildren = this.renderChildren.bind(this);
  }

  // renderChildren() {
  //   const {children} = this.props;
  //
  //   if (!children) return;
  //
  //   return React.Children.map(children, c => {
  //     return React.cloneElement(c, {
  //       map: this.map,
  //       google: this.props.google,
  //       mapCenter: this.state.currentLocation
  //     });
  //   })
  // }
  //
  async fetchPlaces(mapProps, map) {
    // const response = await fetch('https://serene-green.herokuapp.com/places');
    const response = await fetch('http://localhost:5000/places');
    const places = await response.json()
      this.setState({
        // places: places
      });
  }

  mapClicked(mapProps, map, clickEvent) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  navGCPSuccess(pos){
    let crd = pos.coords;
    console.log(crd);
    this.setState({
      currentLocation: {
        lat: crd.latitude,
        lng: crd.longitude
      }
    });
  };

  navGCPError(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  centerMoved(mapProps, map) {
    return navigator.geolocation.getCurrentPosition(this.navGCPSuccess, this.navGCPError, navGCPOptions);
  }

  onMarkerClick(mapProps, marker, e){
    this.setState({
      selectedPlace: mapProps,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  dropPin(mapProps, marker, e){
    console.log(mapProps);
    this.setState({
      droppedPlace: mapProps,
      droppedPin: marker,
      showingDPInfoWindow: true
    });
  }

  handleSubmitPin(event){
    alert('Adding: ' + this.state.droppedPin.title);
    event.preventDefault();
    console.log(this.state.droppedPin);

    // const response = await fetch('https://serene-green.herokuapp.com/places',
    const response = fetch('http://localhost:5000/places',
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
        >

        <Marker
          name="youAreHere"
          position={this.state.currentLocation}
          onClick={this.dropPin}
        />

        <InfoWindow
          marker={this.state.droppedPin}
          visible={this.state.showingDPInfoWindow}>
            <form onSubmit={this.handleSubmitPin}>
              <label>Title/Description:
                <input type="text" value={this.state.droppedPlace.title}></input>
              </label>
              <input type="text" value={this.state.droppedPin.position}/>
              <input type="submit" value="Submit"/>
            </form>
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
