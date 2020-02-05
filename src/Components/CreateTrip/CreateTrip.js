// Dependencies
import React from 'react';
import { connect } from 'react-redux';
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

  submitHandler = () => {
    let cities = [];
    cities.push(this.state.startCity, this.state.endCity);
    this.props.addCitiesToTrip(cities);
  }

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
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