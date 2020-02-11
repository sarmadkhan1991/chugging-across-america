import React from "react";
import axios from "axios";


class SavedTrips extends React.Component {
    constructor() {
        super();
        this.state = {
            incomplete:[],
            complete:[]
        }
        this.getSavedTrips = this.getSavedTrips.bind(this);
        
    }

    componentDidMount() {
        this.getSavedTrips();
    }

    
    getSavedTrips() {
        axios.get("/user/trips").then(res => {
            const reports = res.data;
            let isComplete = [];
            let isNotComplete = [];
           reports.map(r => {
               if(r.completed === true) {
                   isComplete.push(r)
               } else {
                   isNotComplete.push(r)
               }
           })
           this.setState({
               incomplete: isNotComplete,
               complete: isComplete
           })
           
        });
        
    }



  
    render() {
        const { incomplete, complete } = this.state;

        const incompleteTrips = incomplete.map(trip => {
            return (
                <div key={trip.id}>
                    <div>{trip.starting_city}</div>
                    <div>{trip.ending_city}</div>
                    Completed:<button>{trip.completed.toString()}</button>
                </div>
            )
        });
        const completedTrips = complete.map(trip => {
            return (
                <div key={trip.id}>
                <div>{trip.starting_city}</div>
                <div>{trip.ending_city}</div>
                Completed:<button>{trip.completed.toString()}</button>
            </div>
            )
        })

        
        return(
            <div>
                <div>
                    <h1>Current Trips:</h1>
                    {incompleteTrips}
                </div>
                <div>
                    <h1>Completed Trips:</h1>
                    {completedTrips}
                </div>
            </div>
        )
    }
}


export default SavedTrips;