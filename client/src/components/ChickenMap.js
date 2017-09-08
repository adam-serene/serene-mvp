import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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
          description: 'The Dark Horse',
          position: {
            lat: 39.999115,
            lng: -105.255192
          },
          url: 'https://orig09.deviantart.net/c283/f/2014/021/5/2/chicken_caw_animation_by_captaintoog-d7338wq.gif'
        },
        {id: 2,
          description: 'Yellowbelly',
          position: {
            lat: 40.015210,
            lng: -105.262171
          },
          url: 'https://orig09.deviantart.net/c283/f/2014/021/5/2/chicken_caw_animation_by_captaintoog-d7338wq.gif'
        },
        {id: 3,
          description: 'South Mouth',
          position: {
            lat: 40.013998,
            lng: -105.278217
          },
          url: 'https://orig09.deviantart.net/c283/f/2014/021/5/2/chicken_caw_animation_by_captaintoog-d7338wq.gif'
        },
        {id: 4,
        description: 'West End Tavern (eat 50!!)',
          position: {
            lat: 40.016997,
            lng: -105.283247
          },
          url: 'https://orig09.deviantart.net/c283/f/2014/021/5/2/chicken_caw_animation_by_captaintoog-d7338wq.gif'
        },
        {id: 5,
          description: "Chester's (inside King Soopers)",
          position: {
            lat: 40.015808,
            lng: -105.2518
          },
          url: 'https://orig09.deviantart.net/c283/f/2014/021/5/2/chicken_caw_animation_by_captaintoog-d7338wq.gif'
        },
        {id: 6,
          description: 'KFC',
          position: {
            lat: 40.014290,
            lng: -105.25087
          },
          url: 'https://orig09.deviantart.net/c283/f/2014/021/5/2/chicken_caw_animation_by_captaintoog-d7338wq.gif'
        },
        {id: 7,
          description: 'Under the Sun',
          position: {
            lat: 39.984318,
            lng: -105.249369
          },
          url: 'https://orig09.deviantart.net/c283/f/2014/021/5/2/chicken_caw_animation_by_captaintoog-d7338wq.gif'
        },
        {id: 8,
          description: 'Whole Foods ($5 Wednesday)',
          position: {
            lat: 40.024103,
            lng: -105.256046
          },
          url: 'https://orig09.deviantart.net/c283/f/2014/021/5/2/chicken_caw_animation_by_captaintoog-d7338wq.gif'
        },
        {id: 9,
          description: 'Safeway (Sean <3 chicky tenders)',
          position: {
            lat: 40.013290,
            lng: -105.259621
          },
          url: 'https://orig09.deviantart.net/c283/f/2014/021/5/2/chicken_caw_animation_by_captaintoog-d7338wq.gif'
        },
        {id: 10,
          description: 'Sushi Zanmai',
          position: {
            lat: 40.019244,
            lng: -105.279846
          },
          url: 'https://orig09.deviantart.net/c283/f/2014/021/5/2/chicken_caw_animation_by_captaintoog-d7338wq.gif'
        },
      ],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
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
              <img src={this.state.selectedPlace.url} alt=""/>
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
