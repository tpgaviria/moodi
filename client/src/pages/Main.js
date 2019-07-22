import React, { Component } from 'react';
import Logo from '../components/Logo';
import WeatherWidget from '../components/WeatherWidget';
import SpotifyButton from '../components/SpotifyButton';
import LIFXButton from '../components/LIFXButton';
import API from '../utilities/APIs';


class Main extends Component {
    state = {
        currentCity: "Atlanta",
        weatherData: ""
        //HAI I SET MY STATE TO THIS. 
    }

    // componentDidMount() {

    //HAI I"M THE AXIOS CALL. 
    //HAI JUST DO THIS.SETSTATE WITH ME :^)
    // }

    getWeather = () => {
        API.getWeather(this.state.currentCity)
            .then(res => this.setState({
                weatherData: res.data
            }))
    }

    componentDidMount() {
        this.getWeather();
    }

    render() {
        return (
            <div>
                <Logo />
                <WeatherWidget />
                <SpotifyButton />
                <LIFXButton />
            </div>
        );
    }
}

export default Main;