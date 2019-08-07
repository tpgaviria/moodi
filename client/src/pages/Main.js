// import axios from 'axios';
import React, { Component } from 'react';
import Logo from '../components/Logo';
import hash from "../hash";
import WeatherWidget from '../components/WeatherWidget';
import Player from '../components/SpotifyButton';
// import LIFXButton from '../components/LIFXButton';
import MoodSelector from '../components/MoodSelector';
// import API from '../utilities/APIs';
import BackgroundCanvas from '../components/BackgroundCanvas';
import '../components/SpotifyButton/SpotifyButton.css';
import { authEndpoint, clientId, redirectUri, devredirectUri, scopes } from "../config";
require('dotenv').config();

class Main extends Component {
    state = {
        currentCity: "Atlanta",
        token: null,
        mood: null,
        weather: null
    }

    componentDidMount() {
        let _token = hash.access_token;
        if (_token) {
            this.setState({
                token: _token
            });
        }
    }

    componentDidUpdate () {
        console.log('component updated')
    }

    handleWeatherGet(data) {
        this.setState({
            weather: data
        })
    }

    handleMoodSelection(event) {
        this.setState({
            mood: event.target.value
        })

    }

    render() {
        console.log(`weather: ${this.state.weather}, mood: ${this.state.mood}`)
        return (
            <div>
                <BackgroundCanvas />
                <Logo />
                <WeatherWidget handleWeatherGet={this.handleWeatherGet.bind(this)} />
                {/* <LIFXButton /> */}
                {this.state.token && <MoodSelector onChange={this.handleMoodSelection.bind(this)} />}

                {!this.state.token && window.location.hostname !== "localhost" && (
                    <a
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                            "%20"
                        )}&response_type=token&show_dialog=true`}
                    ><button className="btn-lg btn-success">
                            Login to Spotify
            </button></a>
                )}
                {!this.state.token && window.location.hostname === "localhost" && (
                    <a
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${devredirectUri}&scope=${scopes.join(
                            "%20"
                        )}&response_type=token&show_dialog=true`}
                    ><button className="btn-lg btn-success">
                            Login to Spotify
            </button></a>
                )}
                {this.state.token && this.state.weather && !this.state.mood && (
                    <Player
                        token={this.state.token}
                        mode={this.state.weather}
                    />
                )}
                {this.state.token && this.state.weather && this.state.mood && (
                    <Player
                        token={this.state.token}
                        mode={this.state.mood}
                    />
                )}
            </div >
        );
    }
}

export default Main;