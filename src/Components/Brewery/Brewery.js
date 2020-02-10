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

    componentDidMount () {
        axios.get(`https://sandbox-api.brewerydb.com/v2//brewery/${this.props.trip.currentBrewery.breweryId}/beers?key=${process.env.REACT_APP_BREWERIES_API_KEY}`
            ).then(res => {
                const beers = res.data.data;
                const currentBeers = beers.filter(beer => {
                    if (beer.isRetired === 'N'){
                        return beer
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
                    <div>beer type: {beer.style.category.name}</div>
                    <div>ABV: {beer.abv}%</div>
                </div>
            )
        })
        return (
            <div>
                <Link to='/trip'>
                    <div>Back to trip</div>
                </Link>
                <h1>Brewery:</h1>
                    <div>name: {currentBrewery.name}</div>
                    <div>address: {currentBrewery.address.streetAddress}, {currentBrewery.address.city}, {currentBrewery.address.state}, {currentBrewery.address.zip}</div>
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