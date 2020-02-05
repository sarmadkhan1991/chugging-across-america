
//initial state
const initialState = {
    trip: null
}


//constants
const ADD_BREWERIES = 'ADD_BREWERIES';




//action creator
export function addBreweriesToTrip (breweries) {
    return {
        type: ADD_BREWERIES,
        payload: breweries
    }
}








//reducer
export default function reducer (state = initialState, action) {
    switch (action.type) {
        case ADD_BREWERIES:
            const { id, latitude, longitude } = action.payload;
            return {
                ...state,
                breweryId: id,
                breweryLatitude: latitude,
                breweryLongitude: longitude
            }
        default:
            return state;
    }
}