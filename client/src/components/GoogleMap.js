import React, {Component} from 'react';
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
} from 'google-maps-react';
import Nav from './Nav.js'
import Auth from './Auth.js'
import theSpots from './theSpots.js'

const navGCPOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: {},
      currentLocation: {
        lat: 40.0150,
        lng: -105.2705
      },
      open:false,
      places: [],
      selectedPlace: {},
      showingInfoWindow: false,
    };
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

  async componentWillMount(){
    navigator.geolocation.getCurrentPosition(this.navGCPSuccess, this.navGCPError, navGCPOptions);
    let placesArr = [];
    const response = await fetch('https://serenegreen.herokuapp.com/places')
    const responseJson = await response.json()
    placesArr.push(responseJson.park.results, responseJson.campground.results, responseJson.museum.results, responseJson.amusement.results, theSpots)
    this.setState({places: placesArr});
  }

  navGCPError=(err)=>{
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

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

  render() {
    const style = {
      width: '100vw',
      height: '92vh'
    };

    return (
      <div>
      {
        document.cookie
        ?
      <div>
        <Nav />
        <Map
          google={this.props.google}
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
            open={place.opening_hours ? place.opening_hours.open_now : null}
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
        </div>
        :
        <Auth />
      }
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs'

})(MapContainer)
