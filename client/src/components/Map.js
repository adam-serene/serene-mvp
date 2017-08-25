import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
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
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)
