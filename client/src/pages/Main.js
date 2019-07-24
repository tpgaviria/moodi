// import axios from 'axios';
import React, { Component } from 'react';
import Logo from '../components/Logo';
import WeatherWidget from '../components/WeatherWidget';
import SpotifyButton from '../components/SpotifyButton';
import LIFXButton from '../components/LIFXButton';
import API from '../utilities/APIs';
require('dotenv').config();

class Main extends Component {
    state = {
        currentCity: "Atlanta",
        weatherData: "",
        currentTime: "",
        weatherMain: "",
        weatherDesc: "",
        currentTemp: "",
        weatherIconId: ""
    }

    componentDidMount() {

        let time = "";

        const initialTime = () => {
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
            time = `${hour}:${minutes}:${seconds} ${ampm}`;
        }
        initialTime();

        API.getWeather(this.state.currentCity)
            .then(res => {
                const temp = (Math.round(((res.data.main.temp) - 273.15) * 1.8) + 32) + '°';
                this.setState({
                    weatherData: res.data,
                    currentTime: time,
                    weatherMain: res.data.weather[0].main,
                    weatherDesc: res.data.weather[0].description,
                    currentTemp: temp,
                    icon: res.data.weather[0].icon
                })
            })
            .catch(console.log('error getting weather'))
    }

    render() {
        const tick = () => {
            let time = "";

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

            time = `${hour}:${minutes}:${seconds} ${ampm}`;
            this.setState({
                currentTime: time
            })
        }
        setTimeout(tick, 1000);
        return (
            <div>
                <Logo />
                <WeatherWidget data={this.state} />
                <SpotifyButton />
                <LIFXButton />
            </div >
        );
    }
}

export default Main;