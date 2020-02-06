import React, { Component } from 'react';
import axios from 'axios';
import './Breweries.css';
import { addBreweriesToTrip } from '../../Redux/tripReducer';
import { connect } from 'react-redux'


class Breweries extends Component {
    constructor(props) {
        super (props)

        this.state = {
            breweries: [],
            locations: []
        }
    }

    componentDidMount () {
        const key = process.env.REACT_APP_BREWERIES_API_KEY;
        axios.get(`https://sandbox-api.brewerydb.com/v2/breweries/?key=${key}&withLocations=y`).then(res => {
            const breweriesWithLocations = res.data.data.filter(brew => {
                if (brew.locations){
                    return brew
                }
            })
            const breweriesWithoutLocations = breweriesWithLocations.map(brew => {
                const {id, name, website, images} = brew
                const brewery = {
                    id: id,
                    name: name, 
                    website: website,
                    images: images
                }
                return brewery;
            })
            console.log(breweriesWithLocations);
            const breweryLocations = breweriesWithLocations.map(brew => {
                const locations = [];

            })
            this.setState({
                breweries: breweriesWithoutLocations
            })
        })
    }

    render () {
        //console.log(this.state)
        // const city = 'Saint Louis';
        // const { breweries } = this.state;
        // const filteredBreweries = breweries.filter(brew => {
        //     const {} = brew;
        //     if (brew.locations) {
        //         return brew.locations.filter(location => {
        //             if (location.locality === city && location.openToPublic === 'Y'){
        //                 return location
        //             }
        //         })
        //     }
        // });
        // console.log(filteredBreweries);
        // const mappedBreweries = breweries.map(brew => {
        //     //console.log(brew);
        //     const placeHolder = 'https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png';
        //     return (
        //         <div key={brew.id}>
        //             <img src={brew.images ? brew.images.icon : placeHolder} alt='brewery icon' />
        //             <h2>name: {brew.name}</h2>
        //             <h3>website: <a href={brew.website} target='_blank'>{brew.name}</a></h3>
        //         </div>
        //     )
        // })
        return (
            <div>
                <h1>breweries:</h1>
                {/* {mappedBreweries} */}
            </div>
        )
    }
}

function mapStateToProps (reduxState) {
    return {
        trip: reduxState
    }
}

export default connect (mapStateToProps, {addBreweriesToTrip}) (Breweries);