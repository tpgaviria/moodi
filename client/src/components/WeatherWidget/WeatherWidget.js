import React, { Component } from 'react';
import './WeatherWidget.css';
import Clock from '../Clock/index';
import API from '../../utilities/APIs';
import hash from "../../hash";

class WeatherWidget extends Component {

    state = {
        currentCity: "Atlanta",
        currentTemp: null,
        weatherData: null,
        weatherMain: null,
        weatherDesc: "",
        weatherIconId: ""
    }

    getWeather = () => {
        API.getWeather(this.state.currentCity)
            .then(res => {
                const temp = (Math.round(((res.data.main.temp) - 273.15) * 1.8) + 32) + '°';
                this.props.handleWeatherGet(res.data.weather[0].main);
                this.setState({
                    weatherData: res.data,
                    weatherMain: res.data.weather[0].main,
                    weatherDesc: res.data.weather[0].description,
                    currentTemp: temp,
                    icon: res.data.weather[0].icon
                })
            })

        let _token = hash.access_token;
        if (_token) {
            this.setState({
                token: _token
            });
        }
    }

    componentWillMount() {
        this.getWeather();
    }

    render() {
        var base_url = window.location.origin;
        return (
            <div>
                {this.state.weatherMain &&
                    <div className="weather-widget-container">
                        <div id="weather-data">
                            <img src={`${base_url}/images/weather/${this.state.icon}.svg`} alt='{weatherMain}' className='weathericon' />
                            <p id='description'>{this.state.weatherDesc}</p>
                        </div>
                        <div id="time-container">
                            <div id="city">
                                <img src={`${base_url}/images/location-pointer.png`} alt='location pointer' id='pointer' />{this.state.currentCity}
                            </div>
                            <div id="clock-container">
                                <Clock />
                            </div>
                        </div>
                        <div id="temp-container">
                            <p id='temp'>{this.state.currentTemp}</p>
                        </div>
                    </div >
                }
            </div >
        )
    }
}

export default WeatherWidget;