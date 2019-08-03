import React from "react";
import * as $ from 'jquery';
import "./SpotifyButton.css";

class Player extends React.Component {
    state = {
        userdata: "",
        token: this.props.token,
        item: '',
        is_playing: '',
        progress_ms: '',
        weatherMain: this.props.weatherMain,
        time: ''
    }
    
    data = {
        topArtists: [],
        playlist: []
    }
    
    // getUserData(token) {
    //     console.log('get user data running');
    //     // Make a call using the token
    //     $.ajax({
    //         url: "https://api.spotify.com/v1/me",
    //         type: "GET",
    //         beforeSend: (xhr) => {
    //             xhr.setRequestHeader("Authorization", "Bearer " + token);
    //         },
    //         success: (data) => {
    //             console.log("userdata", data);
    //         }
    //     });
    // }

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
                this.getSongs(token);
            }
        })
    }

    getSongs(token) {
        let artists = this.data.topArtists;
        let URL = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artists[0]}&${artists[1]}&${artists[2]}&${artists[3]}&${artists[4]}}`;
        // let query = '';
        $.ajax({
            url: URL,
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                console.log(data);
            }
        })
    }



    componentDidMount() {

        if (this.state.token) {
            // Set token
            this.setState({
                token: this.props.token,
                weatherMain: this.props.weatherMain
            });

            this.getTopArtists(this.state.token);
        }


        console.log('weather: ' + this.state.weatherMain);
    }

    render() {

        return (
            <div id="player">
                <iframe src="https://open.spotify.com/embed/playlist/0PIv0RCz16VgfSpWSYwIyy" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" title="player"></iframe>
                {/* {this.props.item &&

                
                    <div className="App" >
                        <div className="main-wrapper">
                            <h1>{this.state.userdata.display_name}</h1>
                            <div className="now-playing__img">
                                <img src={this.props.item.album.images[0].url} alt="album art" />
                            </div>
                            <div className="now-playing__side">
                                <div className="now-playing__name">{this.props.item.name}</div>
                                <div className="now-playing__artist">
                                    {this.props.item.artists[0].name}
                                </div>
                                <div className="now-playing__status">
                                    {this.props.is_playing ? "Playing" : "Paused"}
                                </div>
                                <div className="progress">
                                    <div className="progress__bar" style={this.progressBarStyles} />
                                </div>
                            </div>
                            <div className="background" style={this.backgroundStyles} />{" "}
                        </div> 
                </div> */}

            </div>
        );
    }



}

// const Player = props => {

//     console.log(props);
//     const backgroundStyles = {
//         backgroundImage: `url(${
//             props.item.album.images[0].url
//             })`,
//     };

//     const progressBarStyles = {
//         width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
//     };

//     return (
//         <div className="App">
//             <div className="main-wrapper">
//                 <h1>{props.userdata.display_name}</h1>
//                 <div className="now-playing__img">
//                     <img src={props.item.album.images[0].url} />
//                 </div>
//                 <div className="now-playing__side">
//                     <div className="now-playing__name">{props.item.name}</div>
//                     <div className="now-playing__artist">
//                         {props.item.artists[0].name}
//                     </div>
//                     <div className="now-playing__status">
//                         {props.is_playing ? "Playing" : "Paused"}
//                     </div>
//                     <div className="progress">
//                         <div className="progress__bar" style={progressBarStyles} />
//                     </div>
//                 </div>
//                 <div className="background" style={backgroundStyles} />{" "}
//             </div>
//         </div>
//     );


export default Player;