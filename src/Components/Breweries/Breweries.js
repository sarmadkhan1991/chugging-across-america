import React, { Component } from 'react';
import axios from 'axios';
import './Breweries.css';
import { addBreweriesToTrip } from '../../Redux/tripReducer';
import { connect } from 'react-redux'

const key = 'b9dee4aad43d3349c92d6399586f8c69';
const baseUrl = 'https://sandbox-api.brewerydb.com/v2/'

class Breweries extends Component {
    constructor(props) {
        super (props)

        this.state = {
            breweries: []
        }
    }

    componentDidMount () {
        axios.get('https://sandbox-api.brewerydb.com/v2/breweries/?key=b9dee4aad43d3349c92d6399586f8c69&withLocations=y').then(res => {
            this.setState({
                breweries: res.data.data
            })
        })
    }

    render () {
        const { breweries } = this.state;
        const mappedBreweries = breweries.map(brew => {
            console.log(brew)
            const placeHolder = 'https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png';
            return (
                <div key={brew.id}>
                    <img src={brew.images ? brew.images.icon : placeHolder} alt='brewery icon' />
                    <h2>name: {brew.name}</h2>
                    <h3>website: <a href={brew.website} target='_blank'>{brew.name}</a></h3>
                </div>
            )
        })
        return (
            <div>
                breweries:
                {mappedBreweries}
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