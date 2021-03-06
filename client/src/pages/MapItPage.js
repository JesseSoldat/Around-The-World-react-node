import React, {Component} from 'react';
import GoogleMap from '../components/GoogleMap';

const MapIt = (props) => (
  <div>
    <GoogleMap 
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />} 
      defaultDraggable={true}
    />
  </div>
)

export default MapIt;

