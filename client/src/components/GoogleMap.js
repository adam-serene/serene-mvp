import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 40.0150,
        lng: -105.2705
      },
      places: []
    }
    // this.fetchPlaces = this.fetchPlaces.bind(this);
    // this.loadMap = this.loadMap.bind(this);
    // this.renderChildren = this.renderChildren.bind(this);
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
  // componentDidMount() {
  //   if (this.props.centerAroundCurrentLocation) {
  //       if (navigator && navigator.geolocation) {
  //           navigator.geolocation.getCurrentPosition((pos) => {
  //               const coords = pos.coords;
  //               this.setState({
  //                   currentLocation: {
  //                       lat: coords.latitude,
  //                       lng: coords.longitude
  //                   }
  //               })
  //           })
  //       }
  //   }
  //   this.loadMap();
  // }
  //
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.google !== this.props.google) {
  //     this.loadMap();
  //   }
  // }
  //
  // loadMap(){
  //   if (this.props && this.props.google) {
  //     // google is available
  //     const {google} = this.props;
  //     const maps = google.maps;
  //
  //     const mapRef = this.refs.map;
  //     const node = ReactDOM.findDOMNode(mapRef);
  //
  //     let zoom = 14;
  //     const {lat, lng} = this.state.currentLocation;
  //     // let lat = 37.774929;
  //     // let lng = -122.419416;
  //     const center = new maps.LatLng(lat, lng);
  //     const mapConfig = Object.assign({}, {
  //       center: center,
  //       zoom: zoom
  //     })
  //     this.map = new maps.Map(node, mapConfig);
  //   }
  // }

  async componentDidMount() {
    const response = await fetch('https://serene-green.herokuapp.com/places');
    const places = await response.json()
      this.setState({
        places: places
      });
  }

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }

    return (
      <div style={style}>
        <Map google={this.props.google}
        initialCenter={{
              lat: 40.0150,
              lng: -105.2705
            }}
        zoom={14}
        >
        </Map>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)
