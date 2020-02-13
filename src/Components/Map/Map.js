import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getBrewery} from '../../Redux/tripReducer';
import './Map.css';
import axios from 'axios';

const brewery = require('./beer_wheels.png');

export class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      distance: "",
      duration: ""
    }
  }

  componentDidMount() {
    this.renderMap();
    axios
      .post(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.props.cities[0].name}&destinations=${this.props.cities[1].name}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      .then(res => {
        this.setState({
          distance: res.data.rows[0].elements[0].distance.text,
          duration: res.data.rows[0].elements[0].duration.text
        })
      })
      .catch(e => console.log(e));
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&callback=initMap`);
    window.initMap = this.initMap;
  }

  initMap = () => {
    var directionsService = new window.google.maps.DirectionsService();
    var directionsRenderer = new window.google.maps.DirectionsRenderer();
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: this.props.cities[1].lat, lng: this.props.cities[1].lng},
      zoom: 8,
      gestureHandling: 'greedy'
    });

    var start = {lat: this.props.cities[0].lat, lng: this.props.cities[0].lng}
    var end = {lat: this.props.cities[1].lat, lng: this.props.cities[1].lng}
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };
    
    directionsService.route(request, function(result, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
      }
      console.log(result)
    });

    directionsRenderer.setMap(map);
    this.setMarkers(map);
  }

  setMarkers = (map) => {
    for (let i = 0; i < this.props.cities.length; i++ ){
      let marker = new window.google.maps.Marker({
        position: {lat: this.props.cities[i].lat, lng: this.props.cities[i].lng},
        map: map,
        title: this.props.cities[i].name
      })
    }
    
    var icon = {
      url: brewery,
      scaledSize: new window.google.maps.Size(30,30),
      origin: new window.google.maps.Point(0,0),
      anchor: new window.google.maps.Point(15,15)
    }
    
    let mappedBreweries = this.props.breweries.map(brew => {
      return (
          `<div key=${brew.locId} style='width:200px; height:150px; display:flex; justify-content:space-between; align-items:center; flex-direction:column'>`+
            `<img src=${brew.logo} />`+
            `<div style='font-weight:700; font-size: 16px'>${brew.name}</div>`+
            `<div>`+
              `<div>${brew.address.streetAddress}</div>`+
              `<div>${brew.address.city}, ${brew.address.state}, ${brew.address.zip}</div>`+
            `</div>`+
          `</div>`
      )
    });

    for (let i = 0; i < this.props.breweries.length; i++ ){
      let infowindow = new window.google.maps.InfoWindow({
        content: mappedBreweries[i]
      })
      
      let marker = new window.google.maps.Marker({
        position: {lat: this.props.breweries[i].lat, lng: this.props.breweries[i].lng},
        map: map,
        icon: icon,
        title: this.props.breweries[i].name
      })

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }
  }

  render() {
    return (
      <div>
        <div id="map" />
        <div>
          <h1>Distance: {this.state.distance}</h1>
          <h1>Duration: {this.state.duration}</h1>
        </div>
      </div>
    )
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapReduxStateToProps, {getBrewery}) (Map);