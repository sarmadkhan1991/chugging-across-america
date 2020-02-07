// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// CSS
import './Rating.css';

// Define Component as a class.
class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        Rating
      </div>
    );
  }
}

// Map state to props
function mapReduxStateToProps(reduxState) {
  return reduxState;
}

// Connect component to redux.
export default connect(mapReduxStateToProps)(Rating);