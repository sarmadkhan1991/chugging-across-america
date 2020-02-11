import React from "react";
import axios from 'axios';
import { connect } from "react-redux";


class SaveTripButton extends React.Component {
    constructor(props){
        super();
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
            <div>
                <button onClick={this.addToTrips}>Save Trip</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
    
}

export default connect(mapStateToProps)(SaveTripButton)