import React from 'react';
import { connect } from 'react-redux';
import { getBrewery } from '../../Redux/tripReducer';
import { Link } from 'react-router-dom';

class BrewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breweries: []
    }
  }

  componentDidMount() {
    if (this.props.breweries.length > 0){
      const mappedBreweries = this.props.breweries.map(brew => {
          return (
              <div key={brew.locId}>
                  <Link to='/brewery' >
                      <div onClick={() => this.props.getBrewery(brew)}>name: {brew.name}</div>
                  </Link>
                  <div>address: {brew.address.streetAddress}, {brew.address.city}, {brew.address.state}, {brew.address.zip}</div>
                  <div>hours of Operation: {}</div>
              </div>
              )
          }
      )

      this.setState({
        breweries: mappedBreweries
      })
    } else {
      this.setState({
        breweries: `No Breweries Found in ${this.props.cities[1].name}`
      })
    }

  }
  render() {
    return (
      <div>
        {this.state.breweries}
      </div>
    )
  }
}

function mapStateToProps (reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, {getBrewery})(BrewList);