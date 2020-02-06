// Dependencies
import React from 'react';
import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import { connect } from 'react-redux';

// CSS
import './Map.css';

const beer = require('./beer_wheels.png')

// Define a marker component to display on the map.
const Marker = ({ text }) => {
  return (
  <div
    className="marker"
    onClick={() => {
      alert("Put info here.")
    }}
  >
    <img src={beer} alt="brewery location" />
  </div>
)}

function Map(props) {
  // Locations to pin on map.
  var locations = props.trip.cities;
  if (!locations) {
    locations = [
      {name: "Default", lat: 30, lng: -112},
      {name: "Default2", lat: 31, lng: -113}
    ]
  }

  // Initialize bounds to 0.
  var northBound = 0;
  var eastBound = 0;
  var southBound = 0;
  var westBound = 0;


  // Determine map bounds based on given locations.
  locations.forEach((location, index) => {
    if (index === 0) {
      northBound = location.lat;
      eastBound = location.lng;
      southBound = location.lat;
      westBound = location.lng;
    } else {
      if (location.lat > northBound) northBound = location.lat;
      if (location.lat < southBound) southBound = location.lat;
      if (location.lng > eastBound) eastBound = location.lng;
      if (location.lng < westBound) westBound = location.lng;
    }
  })

  // Determine map center and zoom values using google-map-react built in function.
  const bounds = {
    ne: {lat: northBound, lng: eastBound},
    sw: {lat: southBound, lng: westBound}
  };
  const size = {
    width: 375,
    height: 400
  };
  const {center, zoom} = fitBounds(bounds, size);

  // Create map markers for locations.
  const mappedLocations = locations.map(location => {
    return (
      <Marker
        key={location.lat + location.lng}
        lat={location.lat}
        lng={location.lng}
        text={location.name}
      />
    )
  });

  // Display google map.
  return (
    <div style={{ height: '400px', width: '375px' }}>
      <GoogleMap
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={data => {
          console.log(data)
        }}
        options={
          {
            styles: [
              {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              }
            ] 
          }
        }
      >
        {mappedLocations}
      </GoogleMap>
    </div>
  );
}

// Connect redux state to props.
function mapReduxStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapReduxStateToProps)(Map);