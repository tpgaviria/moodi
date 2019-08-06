// import axios from 'axios';
import React, { Component } from 'react';
import * as $ from "jquery";
import Logo from '../components/Logo';
import hash from "../hash";
import WeatherWidget from '../components/WeatherWidget';
import Player from '../components/SpotifyButton';
// import LIFXButton from '../components/LIFXButton';
import MoodSelector from '../components/MoodSelector';
import API from '../utilities/APIs';
import BackgroundCanvas from '../components/BackgroundCanvas';
import '../components/SpotifyButton/SpotifyButton.css';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
require('dotenv').config();

class Main extends Component {
    state = {
        currentCity: "Atlanta",
        weatherData: null,
        weatherMain: null,
        weatherDesc: "",
        currentTemp: "",
        weatherIconId: "",
        token: null,
        userdata: null
    }

    data = {
        mood: null
    }

    getWeather = () => {
        API.getWeather(this.state.currentCity)
            .then(res => {
                const temp = (Math.round(((res.data.main.temp) - 273.15) * 1.8) + 32) + '°';
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

    getWeatherPlaylist(token) {
        $.ajax({
            url: "https://api.spotify.com/v1/recommendations?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                console.log("recommended", data);
            }
        })
    }

    handleMoodSelection(event) {
        this.data.mood = event.target.value;
        console.log(this.data.mood);
    }

    render() {

        return (
            <div>
                <BackgroundCanvas />
                <Logo />
                {this.state.weatherData && (<WeatherWidget data={this.state} />)}
                {/* <LIFXButton /> */}
                {this.state.token && <MoodSelector onChange={this.handleMoodSelection.bind(this)} />}

                {!this.state.token && (
                    <a
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                            "%20"
                        )}&response_type=token&show_dialog=true`}
                    ><button className="btn-lg btn-success">
                            Login to Spotify
            </button></a>
                )}
                {this.state.token && this.state.weatherData && (
                    <Player
                        token={this.state.token}
                        weatherMain={this.state.weatherMain}
                        item={this.state.item}
                        userdata={this.state.userdata}
                        is_playing={this.state.is_playing}
                        progress_ms={this.progress_ms}
                    />
                )}
            </div >
        );
    }
}

export default Main;