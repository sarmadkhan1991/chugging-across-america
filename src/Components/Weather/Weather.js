import React from "react";
import axios from "axios";


const API_KEY = "8d3bd4a4aa41cc3d806246713a353476"
const API = "http://api.openweathermap.org/data/2.5/weather?"
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
        axios.get("http://api.openweathermap.org/data/2.5/forecast?q=California,us&mode=JSON&appid=8d3bd4a4aa41cc3d806246713a353476").then(res => {
            const weatherReport = res.data;
            this.setState({
                report: weatherReport.list,
                city: weatherReport.city.name
            }); 
            
            
        });
    }

    calcFahrenheit(temp) {
      return (temp - 273.15) * 9/5 + 32
    }
    getDayOfWeek(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = new Date("2020-02-05");
        const dayOf = days[day.getDay(date)];
        return dayOf
    }

    render() {
        const { report, city } = this.state;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = new Date("2020-02-05");
        const dayOf = days[day.getDay()];
        console.log(this.getDayOfWeek("2020-02-05"))
       
          let regex = /12:00:00/
          const mappedDays = report.filter(today => today.dt_txt.match(regex));
          console.log(mappedDays);
          const mappedReports = mappedDays.map(r => {
            console.log(r)
            return (
                <div>

                </div>
            )
          })
      
      
       
        return (
            <div>
  
                <div>{city}</div>
                <div></div>
        
            </div>
        )
    }

}



export default Weather;