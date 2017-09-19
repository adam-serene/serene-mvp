import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './styles/Map.css';
import axios from 'axios';


const navGCPOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// const config = {
//   headers: {
//     // 'Access-Control-Allow-Origin': 'https://serenegreen.herokuapp.com',
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//     'Accept': '*/*',
//     'Content-Type': 'text/plain'
//   }
// };

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


  var map;
  var infowindow;

  function initMap() {
    var pyrmont = {lat: -33.867, lng: 151.195};

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 500,
      type: ['store']
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

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
    // console.log(parkDataJson);
    // axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=park+in+boulder&key=AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs')
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // const campgroundData = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=campground+in+boulder&key=AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs')
    // const campgroundDataJson = await campgroundData.json()
    // const museumData = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=museum+in+boulder&key=AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs')
    // const museumDataJson = await museumData.json()
    // const amusementparkData = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=amusement_park+in+boulder&key=AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs')
    // const amusementparkDataJson = await amusementparkData.json()
    // placesArr.push(parkDataJson.results, campgroundDataJson.results, museumDataJson.results, amusementparkDataJson.results, theSpots)
    // placesArr.push(theSpots)
    // const response = await fetch('https://serenegreen.herokuapp.com/places')
    // console.log(response.json());
    // placesArr.push(response.json())

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
      <div id="map"></div>
    );
  }
} //closes MapContainer

export default MapContainer
// GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyA-c7nBnaF1rAjzLZxQoSN4wWfgiFyTeFs'
//
// })(MapContainer)
