import React from "react";
import Weather from "../Weather/Weather"
import Map from '../Map/Map';
import {connect} from 'react-redux';
import {getBrewery} from '../../Redux/tripReducer';
import { Link } from 'react-router-dom'
import SaveTripButton from "../SaveTripButton/SaveTripButton";
import { Redirect } from 'react-router-dom'


function Trip(props) {
        if (props.cities) {

            if (props.breweries.length > 0){
                var mappedBreweries = props.breweries.map(brew => {
                    return (
                        <div key={brew.locId}>
                            <Link to='/brewery' >
                                <div onClick={() => props.getBrewery(brew)}>name: {brew.name}</div>
                            </Link>
                            <div>address: {brew.address.streetAddress}, {brew.address.city}, {brew.address.state}, {brew.address.zip}</div>
                            <div>hours of Operation: {}</div>
                        </div>
                        )
                    }
                )
            } else {
                var mappedBreweries = `No Breweries Found in ${props.cities[1].name}`
            }
            return (
                <div>
                    <Map/>
                    <Weather/>
                    {mappedBreweries}
                    <SaveTripButton/>
                </div>
            )
        } else {
            return <Redirect to='/' />
        }
    
}

function mapStateToProps (reduxState) {
    return reduxState
}

export default connect(mapStateToProps, {getBrewery}) (Trip);

