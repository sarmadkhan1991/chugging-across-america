import React from "react";
import Weather from "../Weather/Weather"
import Map from '../Map/Map';


export default function Trip() {
  
        return (
            <div>
                <Map/>
                <Weather/>
                {/* {user.session ? <button>Save Trip</button> 
                : null
                } */}
            </div>
        )
    
}

