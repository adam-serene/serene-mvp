import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  constructor(props) {
   super(props);
   this.state = {
     places: []
   };
   this.fetchPlaces = this.fetchPlaces.bind(this);
  }

  componentWillMount() {
    // fetchPlaces().then(response => {
    //   this.setState({
    //     places: response.places
    //   });
    // });
  }

  fetchPlaces() {

  }

  render() {
    return (
      <Map google={this.props.google}
      initialCenter={{
            lat: 40.0150,
            lng: -105.2705
          }}
      zoom={14}
      >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  // apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)
