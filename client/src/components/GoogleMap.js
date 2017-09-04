import React from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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
        visits_this_month: 2},

        {id: 2,
        user_id: 1,
        description: 'Eldorado Spring Resort & Pool',
        position: {
          lat: 39.93183522069995,
          lng: -105.27945578098297
        },
        visits_this_month: 20}
      ]
    }
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.mapClicked = this.mapClicked.bind(this);
    this.centerMoved = this.centerMoved.bind(this);
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
    // const {google} = mapProps;
    // const service = new google.maps.places.PlacesService(map);
    console.log('fetchPlaces');
    const response = await fetch('https://serene-green.herokuapp.com/places');
    // const response = await fetch('http://localhost:5000/places');
    const places = await response.json()
      this.setState({
        places: places
      });
  }

  mapClicked(mapProps, map, clickEvent) {
    // ...
  }

  centerMoved(mapProps, map) {
    // ...
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

        {this.state.places.map(place =>
          <Marker
            key={place.id}
            title={place.description}
            name={place.description}
            position={place.position}
          />
        )}

        </Map>
      </div>
    );
  }
} //closes MapContainer

export default GoogleApiWrapper({
  // apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  apiKey: 'AIzaSyA3CgIdPGgKcOe9JAax8ZtChsomwWYSzu8'
})(MapContainer)
