// import axios from 'axios';
import React, { Component } from 'react';
import Logo from '../components/Logo';
import hash from "../hash";
import WeatherWidget from '../components/WeatherWidget';
import Player from '../components/SpotifyButton';
import LIFXButton from '../components/LIFXButton';
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
        weather: null,
        lifxSynced: false
    }

    componentDidMount() {
        let _token = hash.access_token;
        if (_token) {
            this.setState({
                token: _token
            });
        }
    }

    handleWeatherGet(data) {
        this.setState({
            weather: data
        })
    }

    handleLifxSynced() {
        this.setState({
            lifxSynced: true
        })
    }

    handleMoodSelection(event) {
        this.setState({
            mood: event.target.value
        })

    }

    // componentDidUpdate() {
    //     this.handleMoodSelection();
    // }

    render() {
        console.log('main page mood ' + this.state.mood);
        return (
            <div>
                <BackgroundCanvas />
                <Logo />
                <WeatherWidget handleWeatherGet={this.handleWeatherGet.bind(this)} />

            
                {this.state.token && this.state.weather && !this.state.mood &&  (<LIFXButton synced={this.state.lifxSynced} handleLifxSynced={this.handleLifxSynced.bind(this)} mode={this.state.weather} synced={this.state.lifxSynced}/>)}

                {this.state.token && this.state.mood && (<LIFXButton synced={this.state.lifxSynced} handleLifxSynced={this.handleLifxSynced.bind(this)} mode={this.state.mood} synced={this.state.lifxSynced}/>)}

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