import React, { Component } from 'react';
import axios from 'axios';
import './Brewery.css';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Rating from '../Rating/Rating';


class Breweries extends Component {
    constructor(props) {
        super (props)

        this.state = {
            beers: []
        }
    }

    async componentDidMount () {
        const { breweryId } = this.props.trip.currentBrewery;
        const res = await axios.post('/api/beers', { breweryId });
        console.log(res)
        // axios.get(`/v2/brewery/${this.props.trip.currentBrewery.breweryId}/beers?key=${process.env.REACT_APP_BREWERIES_API_KEY}`
        //     ).then(res => {
                const beers = res.data.data;
                const currentBeers = beers.filter(beer => {
                    if (beer.isRetired === 'N'){
                        return beer;
                    } else {
                        return null;
                    }
                })
                this.setState({
                    beers: currentBeers
                })
        //     })
    }

    render () {
        const {currentBrewery} = this.props.trip
        const {beers} = this.state;
        const mappedBeers = beers.map(beer => {
            return (
                // <div key={beer.id}>
                //     <div>beer name: {beer.name}</div>
                //     {
                //         beer.style
                //         ?
                //         <div>beer type: {beer.style.category.name}</div>
                //         :
                //         <div>beer type: no listed type</div>
                //     }
                //     <div>ABV: {beer.abv}%</div>
                // </div>
                <tr key={beer.id}>
                    <td>
                        {beer.name}
                    </td>
                    <td>
                        {beer.style.category.name}
                    </td>
                    <td>
                        {beer.abv}%
                    </td>
                </tr>
            )
        })
        return (
            <div id='brewery-detail'>
                <div>
                    <br /><br />
                    <Link to='/trip'>
                        Back to Trip
                    </Link>
                    <br /><br />
                </div>
                <h1>
                    {currentBrewery.name}
                </h1>
                <address>
                    {currentBrewery.address.streetAddress}<br />
                    {currentBrewery.address.city}, {currentBrewery.address.state} {currentBrewery.address.zip}
                </address>
                <Rating />
                <br />
                <h2>
                    Beer List
                </h2>
                <table>
                    <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Type
                        </th>
                        <th>
                            ABV
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {mappedBeers}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps (reduxState) {
    return {
        trip: reduxState
    }
}

export default connect (mapStateToProps, null) (Breweries);