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
      redirect: false,
      steps: []
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
    const startCity = await axios.get(`/maps/api/geocode/json?address=${this.state.startCity}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    const endCity = await axios.get(`/maps/api/geocode/json?address=${this.state.endCity}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    cities.push({
      name: startCity.data.results[0].address_components[0].long_name,
      lat: startCity.data.results[0].geometry.location.lat,
      lng: startCity.data.results[0].geometry.location.lng
    },
    {
      name: endCity.data.results[0].address_components[0].long_name,
      lat: endCity.data.results[0].geometry.location.lat,
      lng: endCity.data.results[0].geometry.location.lng
    });
    this.props.addCitiesToTrip(cities);
    
    // const directionData = await axios.post(`/maps/api/directions/json?origin=${cities[0].name}&destination=${cities[1].name}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    // const { steps } = directionData.data.routes[0].legs[0];
    const directions = await axios.post('/api/directions', {cities});
    const { steps } = directions.data;
    const filteredSteps = steps.filter(step => {
      return step.distance.value > 160000;
    });
    filteredSteps.unshift(steps[0]);
    filteredSteps.push(steps[steps.length - 1]);
    this.setState({
      steps: filteredSteps
    });

      this.state.steps.forEach(async (step, index) => {
        await axios.get(`/v2/search/geo/point?lat=${step.end_location.lat}&lng=${step.end_location.lng}&key=${process.env.REACT_APP_BREWERIES_API_KEY}&radius=100`)
          .then(res => {
            if (res.data.data){
              const breweries = res.data.data;
              const breweriesOpenToPublic = breweries.filter(brew => {
                if (brew.openToPublic === 'Y') {
                  return brew
                }
                return null;
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
            if (index === this.state.steps.length - 1) {
              this.setState({
                redirect: true
              })
            }
          })
          .catch(e => console.log(e));
      })  
  }
  
  render() {
    if(this.state.redirect === true) {
      return <Redirect to='/trip' />
    }

    return (
      <div id="create">
          <h2 id="prompt">Enter two cities to begin:</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.submitHandler();
            }}
          >
            <input
              data-testid="start-city"
              type="text"
              required
              name="startCity"
              placeholder="Start"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
              className="start-city"
            />
            <input
              data-testid="end-city"
              type="text"
              required
              name="endCity"
              placeholder="End"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
              className="end-city"
            />
            <button type="submit" className="submit">Find Beer</button>
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