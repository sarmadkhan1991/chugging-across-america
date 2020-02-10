import React from "react";
import Weather from "../Weather/Weather"
import Map from '../Map/Map';
import {connect} from 'react-redux';
import {getBrewery} from '../../Redux/tripReducer';
import { Link } from 'react-router-dom'


function Trip(props) {
        console.log(props)
        const mappedBreweries = props.breweries.map(brew => {
            return (
                <div key={brew.locId}>
                    <Link to='/brewery' >
                        <div onClick={() => props.getBrewery(brew)}>name: {brew.name}</div>
                    </Link>
                    <div>address: {brew.address.streetAddress}, {brew.address.city}, {brew.address.state}, {brew.address.zip}</div>
                    <div>hours of Operation: {}</div>
                </div>
            )
        })
        return (
            <div>
                <Map/>
                <Weather/>
                {/* {user.session ? <button>Save Trip</button> 
                : null
                } */}
                {mappedBreweries}
            </div>
        )
    
}

function mapStateToProps (reduxState) {
    console.log(reduxState);
    return reduxState
}

export default connect(mapStateToProps, {getBrewery}) (Trip);

