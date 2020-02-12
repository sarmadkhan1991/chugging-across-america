import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Brewery from './Components/Brewery/Brewery';
import Map from './Components/Map/Map';
import CreateTrip from './Components/CreateTrip/CreateTrip';
import Trip from './Components/Trip/Trip';
import Home from './Components/Home/Home';
import SavedTrips from "./Components/SavedTrips/SavedTrips";
import ResetPassword from './Components/ResetPassword';


export default (
    // add routes in this switch.
    // to add routed import your component and add path and component attribut to the route. See example below
    <Switch>
        {/* <Route component={your component} path='your component path' /> */}
        <Route component={Home} exact path='/' />
        <Route path='/brewery' component={Brewery} />
        <Route component={CreateTrip} path='/create' />
        <Route component={Trip} path='/trip'/>
        <Route component={SavedTrips} path='/user/trips'/>
        <Route component={ResetPassword} path='/user/profile' />
    </Switch>
)