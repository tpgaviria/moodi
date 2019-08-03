import React, { Component } from 'react';
import './WeatherWidget.css';
import Clock from '../Clock/index';

class WeatherWidget extends Component {

    render() {
        var base_url = window.location.origin;
        return (
            <div className="weather-widget-container">
                <div id="weather-data">
                    <img src={`${base_url}/images/weather/${this.props.data.icon}.svg`} alt='{this.props.data.weatherMain}' className='weathericon' />
                    <p id='description'>{this.props.data.weatherDesc}</p>
                </div>
                <div id="time-container">
                    <div id="city">
                        <img src={`${base_url}/images/location-pointer.png`} alt='location pointer' id='pointer' />{this.props.data.currentCity}
                    </div>
                    <div id="clock-container">
                        <Clock />
                    </div>
                </div>
                <div id="temp-container">
                    <p id='temp'>{this.props.data.currentTemp}</p>
                </div>
            </div >
        )
    }
}

export default WeatherWidget;