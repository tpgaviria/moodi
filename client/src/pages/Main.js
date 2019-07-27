// import axios from 'axios';
import React, { Component } from 'react';
import * as $ from "jquery";
import Logo from '../components/Logo';
import hash from "../hash";
import WeatherWidget from '../components/WeatherWidget';
import Player from '../components/SpotifyButton';
import LIFXButton from '../components/LIFXButton';
import API from '../utilities/APIs';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
// import axios from 'axios';
require('dotenv').config();

class Main extends Component {
    state = {
        currentCity: "Atlanta",
        weatherData: "",
        currentTime: "",
        weatherMain: "",
        weatherDesc: "",
        currentTemp: "",
        weatherIconId: "",
        token: null,
        item: {
            album: {
                images: [{ url: "" }]
            },
            name: "",
            artists: [{ name: "" }],
            duration_ms: 0,
        },
        is_playing: "Paused",
        progress_ms: 0,
        userdata: ""
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


        let _token = hash.access_token;
        if (_token) {
            // Set token
            this.getCurrentlyPlaying(_token);
            this.setState({
                token: _token
            });
        }



    }


    getCurrentlyPlaying(token) {
        $.ajax({
            url: "https://api.spotify.com/v1/me/player",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                console.log("playingdata", data);
                // this.getCurrentlyPlaying(token);
                this.setState({
                    userdata: data,
                    item: data.item,
                    is_playing: data.is_playing,
                    progress_ms: data.progress_ms
                });
            }
        });

    }


    render() {
        // this.getCurrentlyPlaying(this.state.token);
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
        // setTimeout(tick, 1000);
        return (
            <div>
                <Logo />
                <WeatherWidget data={this.state} />
                {/* <SpotifyButton /> */}
                <LIFXButton />

                {!this.state.token && (
                    <a
                        className="btn btn--loginApp-link"
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                            "%20"
                        )}&response_type=token&show_dialog=true`}
                    >
                        Login to Spotify
            </a>
                )}
                {this.state.token && (
                    <Player
                        token={this.state.token}
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