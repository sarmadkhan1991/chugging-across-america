import React, { Component } from 'react';
import axios from 'axios';
import './Brewery.css';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Rating from '../Rating/Rating';


export class Breweries extends Component {
    constructor(props) {
        super (props)

        this.state = {
            beers: []
        }
    }

    componentDidMount () {
        axios.get(`/v2/brewery/${this.props.trip.currentBrewery.breweryId}/beers?key=${process.env.REACT_APP_BREWERIES_API_KEY}`
            ).then(res => {
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
            })
    }

    render () {
        const {currentBrewery} = this.props.trip
        const {beers} = this.state;
        const mappedBeers = beers.map(beer => {
            return (
                <div key={beer.id}>
                    <div>beer name: {beer.name}</div>
                    {
                        beer.style
                        ?
                        <div>beer type: {beer.style.category.name}</div>
                        :
                        <div>beer type: no listed type</div>
                    }
                    <div>ABV: {beer.abv}%</div>
                </div>
            )
        })
        return (
            <div className='brewery-component'>
                <Link to='/trip'>
                    <div>Back to trip</div>
                </Link>
                    <div>{currentBrewery.name}</div>
                    <div>{currentBrewery.address.streetAddress},<br/> {currentBrewery.address.city}, {currentBrewery.address.state}, {currentBrewery.address.zip}</div>
                    <Rating />
                <h1>beer list:</h1>
                {mappedBeers}
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