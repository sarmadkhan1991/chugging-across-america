import React from "react";
import Weather from "../Weather/Weather"

class Trip extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Weather/>
            </div>
        )
    }
}

export default Trip;