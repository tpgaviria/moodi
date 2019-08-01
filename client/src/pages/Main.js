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
        weatherData: null,
        currentTime: "",
        weatherMain: null,
        weatherDesc: "",
        currentTemp: "",
        weatherIconId: "",
        token: null,
        userdata: null,
        item: {
            album: {
                images: [{ url: "" }]
            },
            name: "",
            artists: [{ name: "" }],
            duration_ms: 0,
        },
        is_playing: "Paused",
        progress_ms: 0
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
            // this.getCurrentlyPlaying(_token);
            this.setState({
                token: _token
            });
        }


    }

    componentDidUpdate() {
        if (this.state.token) {
            this.getWeatherPlaylist(this.state.token);
        }

    }

    // getCurrentlyPlaying(token) {
    //     $.ajax({
    //         url: "https://api.spotify.com/v1/me/player",
    //         type: "GET",
    //         beforeSend: (xhr) => {
    //             xhr.setRequestHeader("Authorization", "Bearer " + token);
    //         },
    //         success: (data) => {
    //             console.log("playingdata", data);
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
        // console.log('state: ' + JSON.stringify(this.state))
        // this.getCurrentlyPlaying(this.state.token);
        // const tick = () => {
        //     let time = "";

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
        //     this.setState({
        //         currentTime: time
        //     })
        // }
        // setTimeout(tick, 1000);
        return (
            <div>
                <Logo />
                {this.state.weatherData && (<WeatherWidget data={this.state} />)}
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