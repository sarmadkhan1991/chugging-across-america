import React from "react";
import axios from "axios";


class SavedTrips extends React.Component {
    constructor() {
        super();
        this.state = {
            savedTrips: []
        }
        this.getSavedTrips = this.getSavedTrips.bind(this);
        
    }

    componentDidMount() {
        this.getSavedTrips();
    }

    
    getSavedTrips() {
        axios.get("/user/trips").then(res => {
            this.setState({
                savedTrips: res.data
            });
        });
        
    }



  
    render() {
        const { savedTrips } = this.state;
       
        const mappedTrips = savedTrips.map(trip => {
           
            return (
                <div key={trip.id}>
                    <div>Starting:{trip.starting_city}</div>
                    <div>Ending:{trip.ending_city}</div>
                    Completed:<button>{trip.completed.toString()}</button>
                </div>
            )
        })
        return(
            <div>
                {mappedTrips}
            </div>
        )
    }
}


export default SavedTrips;