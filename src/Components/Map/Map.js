// Dependencies
import React from 'react';
import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import { connect } from 'react-redux';

// CSS
import './Map.css';

const beer = require('./beer_wheels.png')

// Define a marker component to display on the map.
const BrewMarker = ({ text }) => {
  return (
  <div
    className="brew-marker"
    onClick={() => {
      alert("Put info here.")
    }}
  >
    <img src={beer} alt="brewery location" />
  </div>
)}

const CityMarker = () => {
  return (
    <div
    className="city-marker"
    onClick={() => {
      alert("Put info here.")
    }}
  >
  </div>
  )
}

function Map(props) {
  // Locations to pin on map.
  var cityLocations = props.cities;

  var center, zoom, mappedCities;

  // Initialize bounds to 0.
  var northBound = 0;
  var eastBound = 0;
  var southBound = 0;
  var westBound = 0;

  if(cityLocations) {
    
    // Determine map bounds based on given locations.
    cityLocations.forEach((location, index) => {
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
    center = fitBounds(bounds, size).center;
    zoom = fitBounds(bounds, size).zoom;
  
    // Create map markers for locations.
    mappedCities = cityLocations.map((location, index) => {
      return (
        <CityMarker
          key={index}
          lat={location.lat}
          lng={location.lng}
          text={location.name}
        />
      )
    });
  }

  // Display google map.
  return (
    !cityLocations
    ?
    <div>
      No Destinations
    </div>
    :
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
        {mappedCities}
      </GoogleMap>
    </div>
  );
}

// Connect redux state to props.
function mapReduxStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapReduxStateToProps, null) (Map);