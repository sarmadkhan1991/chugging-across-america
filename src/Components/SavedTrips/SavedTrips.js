import React from "react";
import axios from "axios";


class SavedTrips extends React.Component {
    constructor() {
        super();
        this.state = {
            incomplete:[],
            complete:[],
            toggle: true
        }
        this.getSavedTrips = this.getSavedTrips.bind(this);
        this.checkbox = this.checkbox.bind(this);
        this.unCheckbox = this.unCheckbox.bind(this);
    }

    componentDidMount() {
        this.getSavedTrips();
    }

    toggleTripCompletion() {

        
    }
    
    getSavedTrips() {
        axios.get("/user/trips").then(res => {
            const reports = res.data;
            let isComplete = [];
            let isNotComplete = [];
           reports.map(r => {
               if(r.completed === true) {
                   return isComplete.push(r)
               } else {
                   return isNotComplete.push(r)
               }
           })
           this.setState({
               incomplete: isNotComplete,
               complete: isComplete
           })
           
        });
        
    }

    checkbox(id) {
        axios.put("/user/trips", {value: true, id}).then(() => {
            this.getSavedTrips();
        })
    }

    unCheckbox(id) {
        axios.put("/user/trips", {value: false, id}).then(() => {
            this.getSavedTrips();
        })
    }

   


  
    render() {
        const { incomplete, complete } = this.state;

        const incompleteTrips = incomplete.map(trip => {
            return (
                <div key={trip.id}>
                    <div>{trip.starting_city}</div>
                    <div>{trip.ending_city}</div>
                    Completed:<input onChange={() =>this.checkbox(trip.id)} type="checkbox" value={trip.completed}/>
                </div>
            )
        });
        const completedTrips = complete.map(trip => {
            return (
                <div key={trip.id}>
                <div>{trip.starting_city}</div>
                <div>{trip.ending_city}</div>
                Completed: <input onChange={() => this.unCheckbox(trip.id)} type="checkbox" value={trip.completed} defaultChecked/>
            </div>
            )
        })

        
        return(
            <div className="saved-trips">
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