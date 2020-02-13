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
      console.log(this.props.breweries);
      const filtered = Array.from(new Set(this.props.breweries.map(a => a.locId))).map(locId => {
        return this.props.breweries.find(a => a.locId === locId)
      })
      console.log(filtered);
      const mappedBreweries = filtered.map(brew => {
          return (
              <div key={brew.locId}>
                  <Link to='/brewery' >
                      <div onClick={() => this.props.getBrewery(brew)}>{brew.name}</div>
                  </Link>
                  <div>{brew.address.streetAddress},<br/>{brew.address.city}, {brew.address.state}, {brew.address.zip}</div>
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