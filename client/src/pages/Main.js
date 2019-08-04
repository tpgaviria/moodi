// import axios from 'axios';
import React, { Component } from 'react';
import * as $ from "jquery";
import Logo from '../components/Logo';
import hash from "../hash";
import WeatherWidget from '../components/WeatherWidget';
import Player from '../components/SpotifyButton';
import LIFXButton from '../components/LIFXButton';
import API from '../utilities/APIs';
import BackgroundCanvas from '../components/BackgroundCanvas';
import '../components/SpotifyButton/SpotifyButton.css';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
// import axios from 'axios';
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
        userdata: null,
    }

    // componentWillMount() {
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

    // }

    // getCurrentlyPlaying(token) {
    //     $.ajax({
    //         url: "https://api.spotify.com/v1/me/player",
    //         type: "GET",
    //         beforeSend: (xhr) => {
    //             xhr.setRequestHeader("Authorization", "Bearer " + token);
    //         },
    //         success: (data) => {
    //             // console.log("playingdata", data);
    //             // this.getCurrentlyPlaying(token);
    //             this.setState({
    //                 item: data.item,
    //                 is_playing: data.is_playing,
    //                 progress_ms: data.progress_ms
    //             });
    //         }
    //     });

    // }

    getWeatherPlaylist(token) {
        $.ajax({
            url: "https://api.spotify.com/v1/recommendations?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                console.log("recommended", data);
                // this.getCurrentlyPlaying(token);
                // this.setState({
                //     item: data.item,
                //     is_playing: data.is_playing,
                //     progress_ms: data.progress_ms
                // });
            }
        })

    }


    render() {

        // this.getCurrentlyPlaying(this.state.token);

        return (
            <div>
                <BackgroundCanvas />
                <Logo />
                {this.state.weatherData && (<WeatherWidget data={this.state} />)}
                {/* <SpotifyButton /> */}
                <LIFXButton />

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