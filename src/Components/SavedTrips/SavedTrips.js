import React from "react";


class SavedTrips extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { savedTrips } = this.props;
        const mappedTrips = savedTrips.map(trip => {
            returnn (
                <div></div>
            )
        })
        return(
            <div>
                
            </div>
        )
    }
}
const mapSateToProps = state => {
    return {
        savedTrips: state.savedTrips
    }
}


export default connect(mapStateToProps)(SavedTrips)