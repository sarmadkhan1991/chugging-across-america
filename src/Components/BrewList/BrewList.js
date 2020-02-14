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
      
      const filtered = Array.from(new Set(this.props.breweries.map(a => a.locId))).map(locId => {
        return this.props.breweries.find(a => a.locId === locId)
      })

      const mappedBreweries = filtered.map(brew => {
          return (
              <div className="breweries-container" key={brew.locId}>
                <div>
                  <Link className="brewery-name" to='/brewery' >
                      <span onClick={() => this.props.getBrewery(brew)}>{brew.name}</span>
                  </Link>
                  <address>
                    {brew.address.streetAddress}<br />
                    {brew.address.city}, {brew.address.state} {brew.address.zip}
                  </address>
                </div>
              </div>
              )
          }
      )

      this.setState({
        breweries: mappedBreweries
      })
    } else {
      this.setState({
        breweries: `There were no breweries found in ${this.props.cities[1].name}.`
      })
    }

  }
  render() {
    return (
      <div id="weather-container">
        <h1>
          Brewery List<br />
        </h1>
        <div className="breweries-list">
          {this.state.breweries}
        </div>
      </div>
    )
  }
}

function mapStateToProps (reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, {getBrewery})(BrewList);