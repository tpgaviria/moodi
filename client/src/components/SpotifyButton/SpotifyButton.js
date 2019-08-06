import React from "react";
import * as $ from 'jquery';
import "./SpotifyButton.css";
import moodData from '../../../src/moodData.json';

class Player extends React.Component {
    state = {
        userdata: "",
        token: this.props.token,
        item: '',
        is_playing: '',
        progress_ms: '',
        weatherMain: this.props.weatherMain,
        time: '',
        playlistURL: null
    }

    data = {
        moodData,
        userID: '',
        topArtists: [],
        playlistURL: '',
        playlist: []
    }

    getUserData(token) {
        $.ajax({
            url: "https://api.spotify.com/v1/me",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                this.data.userID = data.id;
                this.getTopArtists(token);
            }
        });
    }

    getTopArtists(token) {
        // let token = token;
        $.ajax({
            url: "https://api.spotify.com/v1/me/top/artists",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                for (var i = 0; i < 5; i++) {
                    this.data.topArtists.push(data.items[i].id);
                }
                this.getMusicAttr(token);
            }
        })
    }

    getMusicAttr(token) {
        let weather = this.state.weatherMain;
        weather = weather.toLowerCase();
        let musicAttr = null;
        for (let i = 0; i < moodData.length; i++) {
           if (weather === moodData[i].weather) {
               musicAttr = moodData[i].musicAttr
            }
        }
        let query = $.param(musicAttr);
        this.getSongs(token, query);
    }

    getSongs(token, query) {
        let artists = this.data.topArtists.join('&');
        let URL = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artists}&${query}`;
        console.log(URL);
        // let query = '';
        $.ajax({
            url: URL,
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                for (var i = 0; i < 10; i++) {
                    this.data.playlist.push(data.tracks[i].uri);
                }
                this.checkPlaylistExists(token);
            }
        })
    }
    
    checkPlaylistExists(token) {
        $.ajax({
            url: `https://api.spotify.com/v1/users/${this.data.userID}/playlists??offset=0&limit=50`,
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                let playlistExists = false;
                for (let i = 0; i < data.items.length; i++) {
                    if (data.items[i].name === "Moodi Playlist") {
                        console.log('moodi playlist exists');
                        playlistExists = true;
                        this.data.playlistURL = data.items[i].id;
                        console.log('existing playlist url: ' + this.data.playlistURL);
                        this.addTracksToPlaylist(token);
                        break;
                    };
                }

                if (playlistExists === false) {
                    console.log('moodi playlist does not exist');
                    this.createPlaylist(token);
                }
            }
        })
    }
    
    createPlaylist(token) {
        const data = {
            "name": "Moodi Playlist",
            "public": false
        }
        $.ajax({
            url: `https://api.spotify.com/v1/users/${this.data.userID}/playlists`,
            type: "POST",
            data: JSON.stringify(data),
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (res) => {
                // console.log(res);
                this.data.playlistURL = res.id;
                console.log('playlist created, id: ' + this.data.playlistURL);
                this.addTracksToPlaylist(token);
            }
        });
    }

    addTracksToPlaylist(token) {
        let data = this.data.playlist.join();
        $.ajax({
            url: `https://api.spotify.com/v1/playlists/${this.data.playlistURL}/tracks?uris=${data}&position=0`,
            type: "POST",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (res) => {
                this.setState({ playlistURL: this.data.playlistURL});
            }
        });
    }


    componentDidMount() {
        if (this.state.token) {
            this.setState({
                token: this.props.token,
                weatherMain: this.props.weatherMain
            });
            this.getUserData(this.state.token);
        }
        console.log('weather: ' + this.state.weatherMain);
    }

    render() {
        return (
            <div>
                <div id="player">
                    {this.state.playlistURL &&
                        <iframe src={`https://open.spotify.com/embed/playlist/${this.data.playlistURL}`} width="400" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" title="player"></iframe>
                    }
                </div>
            </div>
        );
    }
}

export default Player;