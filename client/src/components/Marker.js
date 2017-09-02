import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const evtNames = ['click', 'mouseover'];
export class Marker extends Component {
  constructor(props){
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        // The relevant props have changed
    }
  }

  handleEvent(evtName) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e);
      }
    }
  }

  renderMarker() {
    let {
        map, google, position, mapCenter
      } = this.props;

      let pos = position || mapCenter;
      position = new google.maps.LatLng(pos.lat, pos.lng);

      const pref = {
        map: map,
        position: position
      };
      this.marker = new google.maps.Marker(pref);

       evtNames.forEach(e => {
         this.marker.addListener(e, this.handleEvent(e));
       })
  }

  render() {
    return null;
  }
}

Marker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object
}
