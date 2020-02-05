import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Map from './Components/Map/Map';
import CreateTrip from './Components/CreateTrip/CreateTrip';

export default (
    // add routes in this switch.
    // to add routed import your component and add path and component attribut to the route. See example below
    <Switch>
        {/* <Route component={your component} path='your component path' /> */}
        <Route component={Map} path='/map' />
        <Route component={CreateTrip} path='/create' />
    </Switch>
)