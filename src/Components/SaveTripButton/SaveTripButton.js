import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';

export class SaveTripButton extends React.Component {
    constructor(props){
        super(props);
        this.addToTrips = this.addToTrips.bind(this);
    }


    

addToTrips() {
    const { cities } = this.props
    let cityOne = cities[0].name;
    let cityTwo = cities[1].name
    axios.post('/user/trip', {cityOne, cityTwo}).then(res => {
        console.log(res);
    })
};

    render() {
        return (
            <div className="save-button-container">
                <Link to="/">
                    <button className='save-button'>Cancel</button>
                </Link>
                <button className='save-button' onClick={this.addToTrips}>Save Trip</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return state
    
}

export default connect(mapStateToProps)(SaveTripButton)