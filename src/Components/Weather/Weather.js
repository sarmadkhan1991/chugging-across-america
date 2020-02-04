import React from "react";
import axios from "axios";


const API_KEY = "8d3bd4a4aa41cc3d806246713a353476"
const API = "http://api.openweathermap.org/data/2.5/weather?"
class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: []
        }
        this.getWeather = this.getWeather.bind(this);
        this.calcFahrenheit = this.calcFahrenheit.bind(this);
    }

    componentDidMount() {
        this.getWeather();
    }

    getWeather() {
        axios.get("http://api.openweathermap.org/data/2.5/weather?appid=8d3bd4a4aa41cc3d806246713a353476&q=Minnesota,us").then(res => {
            const weatherReport = res.data;
            this.setState({
                report: weatherReport
            }); 
            
            
        });
    }

    calcFahrenheit(temp) {
      return (temp - 273.15) * 9/5 + 32
    }

    render() {
       
        
        const { report } = this.state;
        
       if(report.main) {
        console.log(report.name)
        console.log(report.main.temp)
        console.log(report.main.temp_min)
        console.log(report.main.temp_max)
        console.log(report.weather[0].main)
        console.log(report.weather[0].description)
       }
        return (
            <div>
   {report.main && 
        <div>
                <div>{report.name}</div>
                <span>{report.main.temp_min}, {report.main.temp_max}</span>
                <div>{report.weather[0].main}</div>
        </div>
   
   }
            </div>
        )
    }

}



export default Weather;