//initial state
const initialState = {
    trip: null
}


//constants
const ADD_BREWERIES = 'ADD_BREWERIES';
const ADD_CITIES = 'ADD_CITIES';
const GET_CURRENT_BREWERY = 'GET_CURRENT_BREWERY';



//action creator
export function addBreweriesToTrip (breweries) {
    return {
        type: ADD_BREWERIES,
        payload: breweries
    };
};
    
export function addCitiesToTrip(cities) {
    return {
        type: ADD_CITIES,
        payload: cities
    }
}

export function getBrewery(brewery) {
    return {
        type: GET_CURRENT_BREWERY,
        payload: brewery
    }
}






//reducer
export default function reducer (state = initialState, action) {
    switch (action.type) {
        case ADD_BREWERIES:
            if (state.breweries) {
                let breweries = state.breweries;
                action.payload.forEach(brew => {
                    if (breweries.includes(brew.locId)){
                        return;
                    }
                    breweries.push(brew);
                });
                return {
                    ...state,
                    breweries: breweries
                }
            } else {
                return {
                    ...state,
                    breweries: action.payload
                }
            }
        case ADD_CITIES:
            return {
                ...state, 
                cities: action.payload
            }
        case GET_CURRENT_BREWERY:
            return {
                ...state,
                currentBrewery: action.payload
            }
        default:
            return state;
    }
}