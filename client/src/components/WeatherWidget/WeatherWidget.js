import React, { Component } from 'react';
import './WeatherWidget.css';




class WeatherWidget extends Component {

    render() {

        var base_url = window.location.origin;
        // console.log(host);
        return (
            <div className="weather">
                <div>
                    <img src={`${base_url}/images/weather/${this.props.data.icon}.svg`} alt='{this.props.data.weatherMain}' className='weathericon' />
                    <p id='description'>{this.props.data.weatherDesc}</p>
                </div>
                <div>
                    <div>
                        <img src={`${base_url}/images/location-pointer.png`} alt='location pointer' id='pointer' />{this.props.data.currentCity}
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