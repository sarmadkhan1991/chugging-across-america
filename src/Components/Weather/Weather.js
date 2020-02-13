import React from "react";
import axios from "axios";
import { connect } from "react-redux";



class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: [],
            city: ""
        }
        this.getWeather = this.getWeather.bind(this);
        this.calcFahrenheit = this.calcFahrenheit.bind(this);
    }

    componentDidMount() {
        this.getWeather();
        
    }

    getWeather() {
        const key = process.env.REACT_APP_WEATHER_KEY;
        const { city } = this.props;
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city.name},us&mode=JSON&appid=${key}`).then(res => {
            const weatherReport = res.data;
            this.setState({
                report: weatherReport.list,
                city: weatherReport.city.name
            }); 
            
            
        });
    }

    calcFahrenheit(temp) {
      return Math.floor((temp - 273.15) * 9/5 + 32)
    }
    getDayOfWeek(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = new Date(date);
        const dayOf = days[day.getDay(date)];
        return dayOf
    }

    render() {
        const { report } = this.state;
        const { city } = this.props;
     
          let regex = /12:00:00/
          const mappedDays = report.filter(today => today.dt_txt.match(regex));
       
          const mappedReports = mappedDays.map((r, index) => {
            return (
                <div key={index}>
                    <div className="weather-container">
                        {this.getDayOfWeek(r.dt_txt)}<br /><br />
                        {this.calcFahrenheit(r.main.temp)}&#8457;<br />
                        <img src={`https://openweathermap.org/img/wn/${r.weather[0].icon}.png`} alt="forecast" height="50px"/><br />
                        {r.weather[0].description}
                    </div>
                    
                </div>
            )
          })
      
      
       
        return (
            <div>
  
                <div>{city.name}</div>
                <hr />
                <div>{mappedReports}</div>
                
                <hr className="clear-float" />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        city: state.cities[1]
    }
}



export default connect(mapStateToProps)(Weather);