import React, { Component } from 'react';
import './WeatherWidget.css';




class WeatherWidget extends Component {

    render() {
        return (
            <div className="weather">
                <div>
                    <img src={`./images/weather/${this.props.data.icon}.svg`} alt='{this.props.data.weatherMain}' className='weathericon' />
                    <p id='description'>{this.props.data.weatherDesc}</p>
                </div>
                <div>
                    <div>
                        <img src='./images/location-pointer.png' alt='location pointer' id='pointer' />{this.props.data.currentCity}
                    </div>
                    <div>

                        <p id='time'>{this.props.data.currentTime}</p>
                    </div>
                </div>
                <p id='temp'>{this.props.data.currentTemp}</p>
                {/* <p>Weather: {this.props.data.weatherMain}</p> */}
            </div >
        )
    }
}

export default WeatherWidget;