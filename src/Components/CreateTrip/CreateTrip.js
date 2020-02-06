// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addCitiesToTrip } from '../../Redux/tripReducer';

// CSS
import './CreateTrip.css'

// Declare CreateTrip component as a class.
class CreateTrip extends React.Component {
  // Use constructor for initial state.
  constructor(props) {
    super(props);
    this.state = {
      startCity: "",
      endCity: ""
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

    this.props.addCitiesToTrip(cities);
    this.props.history.push('/trip');
  }

  render() {
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
  addCitiesToTrip
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(CreateTrip);