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
    }

    getWeather = () => {
        API.getWeather(this.state.currentCity)
            .then(res =>
                this.setState({
                weatherData: res
            }))
            .catch(console.log('error getting weather'))
    }

    componentDidMount() {
        this.getWeather();
    }

    render() {
        return (
            <div>
                <Logo />
                <WeatherWidget onClick={this.getWeather.bind(this)} />
                <SpotifyButton />
                <LIFXButton />
            </div>
        );
    }
}

export default Main;