// Dependencies
import React from 'react';
import { connect } from 'react-redux';

// CSS
import './Home.css'

// Declare Home component as a class.
class Home extends React.Component {
  // Use constructor for initial state.
  constructor() {
    super();
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

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <h2>Enter two cities to begin:</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
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
          <button>Find Beer</button>
        </form>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

const mapDispatchToProps = {

}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Home);