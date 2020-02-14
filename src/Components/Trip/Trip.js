import React from "react";
import Weather from "../Weather/Weather"
import Map from '../Map/Map';
import {connect} from 'react-redux';
import {getBrewery} from '../../Redux/tripReducer';
import BrewList from '../BrewList/BrewList';
import SaveTripButton from "../SaveTripButton/SaveTripButton";
import { Redirect } from 'react-router-dom'


function Trip(props) {
        if (props.cities) {
            return (
                <div>
                    <Map/>
                    <span className="trip">
                    <Weather/>
                    <BrewList />
                    <SaveTripButton/>
                    </span>
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

