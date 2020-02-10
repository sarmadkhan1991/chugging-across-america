// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addCitiesToTrip, addBreweriesToTrip } from '../../Redux/tripReducer';
import { Redirect } from 'react-router-dom';

// CSS
import './CreateTrip.css'

// Declare CreateTrip component as a class.
class CreateTrip extends React.Component {
  // Use constructor for initial state.
  constructor(props) {
    super(props);
    this.state = {
      startCity: "",
      endCity: "",
      redirect: false
    }
  }

  // Define change handler for inputs.
  changeHandler = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  submitHandler = async () => {
    let cities = [];
    await axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.startCity}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      .then(res => {
        cities.push({
          name: res.data.results[0].address_components[0].long_name,
          lat: res.data.results[0].geometry.location.lat,
          lng: res.data.results[0].geometry.location.lng
        });
      })
      .catch(e => console.log(e));
    await axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.endCity}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      .then(res => {
        cities.push({
          name: res.data.results[0].address_components[0].long_name,
          lat: res.data.results[0].geometry.location.lat,
          lng: res.data.results[0].geometry.location.lng
        });
      })
      .catch(e => console.log(e));
      
      await axios.get(`https://sandbox-api.brewerydb.com/v2/search/geo/point?lat=${cities[1].lat}&lng=${cities[1].lng}&key=${process.env.REACT_APP_BREWERIES_API_KEY}&radius=100`)
             .then(res => {
            if (res.data.data){
              const breweries = res.data.data;
              const breweriesOpenToPublic = breweries.filter(brew => {
                  if (brew.openToPublic === 'Y') {
                      return brew
                  }
              });
              const breweryInfo = breweriesOpenToPublic.map(brew => {
                  const {id, breweryId, phone, website, hoursOfOperationExplicit, latitude, longitude, streetAddress, locality, region, postalCode} = brew;
                  const brewery = {
                      locId: id,
                      breweryId: breweryId,
                      name: brew.brewery.name,
                      address: {
                        streetAddress: streetAddress,
                        city: locality,
                        state: region,
                        zip: postalCode
                      },
                      logo: brew.brewery.images.icon,
                      phone: phone,
                      website: website,
                      hoursOfOperation: hoursOfOperationExplicit,
                      lat: latitude,
                      lng: longitude,
                  }
                  return brewery
              })
              this.props.addBreweriesToTrip(breweryInfo);
            } else {
              this.props.addBreweriesToTrip([]);
            }
        })
        .catch(e => console.log(e));

    this.props.addCitiesToTrip(cities);
    this.setState({
      redirect: true
    })
  }
  
  render() {
    if(this.state.redirect) {
      return <Redirect to='/trip' />
    }

    return (
      <div>
          <h2>Enter two cities to begin:</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.submitHandler();
            }}
          >
            <input
              type="text"
              required
              name="startCity"
              placeholder="Start"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
            <input
              type="text"
              required
              name="endCity"
              placeholder="End"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
            <button type="submit">Find Beer</button>
          </form>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

const mapDispatchToProps = {
  addCitiesToTrip,
  addBreweriesToTrip
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(CreateTrip);