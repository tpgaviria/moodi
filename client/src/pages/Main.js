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
        currentTime: "",
        weatherMain: "",
        weatherDesc: "",
        currentTemp: "",
        weatherIconId: ""
    }

    
    
    componentDidMount() {
        
        // getWeather = () => {
            // const CITY = this.state.currentCity;
            // const KEY = process.env.WEATHER_KEY;
            // axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${KEY}`)
            //     .then(results => console.log(results))
            //     .catch(console.log('error getting weather from weather controller'))
        // }
        
        
        API.getWeather(this.state.currentCity)
        .then(res =>
            this.setState({
                // currentTime: time,
                weatherMain: res.data.weather[0].main,
                weatherDesc: res.data.weather[0].description,
                currentTemp: res.data.main.temp,
                    weatherIconId: res.data.weather[0].icon
                })
                )
                .catch(console.log('error getting weather'))
            }
            
            // componentDidMount() {
                //     this.getWeather();
                // }
                
                render() {
                    const tick = () => {
                        // console.log('time calc');
                        let time = "";
                        time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
                        this.setState({
                            currentTime: time
                        })
                    }
                    setTimeout(tick, 1000);
                    // console.log(this.state);
                    return (
                        <div>
                <Logo />
                <WeatherWidget data={this.state} />
                <SpotifyButton />
                <LIFXButton />
            </div>
        );
    }
}

export default Main;