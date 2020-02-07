import React, { Component } from 'react';
import axios from 'axios';
import './Breweries.css';
import { addBreweriesToTrip } from '../../Redux/tripReducer';
import { connect } from 'react-redux'


class Breweries extends Component {
    constructor(props) {
        super (props)

        this.state = {
            breweries: [],
            breweriesClean: []
        }
    }

    componentDidMount () {
        const key = process.env.REACT_APP_BREWERIES_API_KEY;
        const {lat, lng} = this.props.trip.trip.cities[1];
        this.props.addBreweriesToTrip(lat, lng);
        axios.get(`https://sandbox-api.brewerydb.com/v2/search/geo/point?lat=${lat}&lng=${lng}&key=${key}&raduis=100`)
             .then(res => {
            const breweries = res.data.data;
            const breweriesOpenToPublic = breweries.filter(brew => {
                if (brew.openToPublic === 'Y') {
                    return brew
                }
            });
            this.setState({
                breweries: breweriesOpenToPublic
            })
            const breweryInfo = breweriesOpenToPublic.map(brew => {
                const {id, breweryId, phone, website, hoursOfOperationExplicit, latitude, longitude} = brew;
                const brewery = {
                    locId: id,
                    breweryId: breweryId,
                    name: brew.brewery.name,
                    logo: brew.brewery.images.icon,
                    phone: phone,
                    website: website,
                    hoursOfOperation: hoursOfOperationExplicit,
                    lat: latitude,
                    lng: longitude,
                }
                return brewery
            })
            this.setState({
                breweriesClean: breweryInfo
            })
            this.props.addBreweriesToTrip(breweryInfo);
        })
    }

    render () {
        console.log(this.props.trip)
        return (
            <div>
                <h1>breweries:</h1>
                {/* {mappedBreweries} */}
            </div>
        )
    }
}

function mapStateToProps (reduxState) {
    return {
        trip: reduxState
    }
}

export default connect (mapStateToProps, {addBreweriesToTrip}) (Breweries);