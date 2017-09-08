import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './styles/Map.css';

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
      places: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    this.fetchPlaces = this.fetchPlaces.bind(this);
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

  async fetchPlaces(mapProps, map){
    const response = await fetch('https://serene-green.herokuapp.com/places');
    // const response = await fetch('http://localhost:5000/places');
    const places = await response.json()
    this.setState({
      places: places
    });
  }

  mapClicked=(mapProps, map, clickEvent)=>{
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
    console.log(this.state.currentLocation);
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

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(this.navGCPSuccess, this.navGCPError, navGCPOptions);
  }

  render() {
    const style = {
      width: '100vw',
      height: '80vh'
    };

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
              <img className="infoWindowImg" src={this.state.selectedPlace.url} alt=""/>
            </div>
        </InfoWindow>

        </Map>
      </div>
    );
  }
} //closes MapContainer

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyA3CgIdPGgKcOe9JAax8ZtChsomwWYSzu8'

})(MapContainer)
