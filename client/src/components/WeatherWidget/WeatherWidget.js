import React, { Component } from 'react';
import './WeatherWidget.css';




class WeatherWidget extends Component {

    state = {
        time: ''
    }

    // tick() {
    //     let time = '';

    //     let ampm = 'AM';
    //     let hour = new Date().getHours();
    //     if (hour > 12) {
    //         hour = hour - 12;
    //         ampm = 'PM';
    //     }
    //     let minutes = new Date().getMinutes();
    //     if (minutes.toString().length === 1) {
    //         minutes = '0' + minutes;
    //     }
    //     let seconds = new Date().getSeconds();
    //     if (seconds.toString().length === 1) {
    //         seconds = '0' + seconds;
    //     }

    //     time = `${hour}:${minutes}:${seconds} ${ampm}`;
    //     console.log(time);

    // }

    // componentDidMount() {
    //     this.tick();
    // }

    tick = () => {
        let time = '';

        let ampm = 'AM';
        let hour = new Date().getHours();
        if (hour > 12) {
            hour = hour - 12;
            ampm = 'PM';
        }
        let minutes = new Date().getMinutes();
        if (minutes.toString().length === 1) {
            minutes = '0' + minutes;
        }
        let seconds = new Date().getSeconds();
        if (seconds.toString().length === 1) {
            seconds = '0' + seconds;
        }

        return (time = `${hour}:${minutes}:${seconds} ${ampm}`);
       


        setTimeout(this.tick, 1000);

    }

    render() {

        // this.tick();

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

                        <p id='time'>{this.tick()}</p>
                    </div>
                </div>
                <p id='temp'>{this.props.data.currentTemp}</p>
                {/* <p>Weather: {this.props.data.weatherMain}</p> */}
            </div >
        )
    }
}

export default WeatherWidget;