import React, { Component } from 'react';
import Logo from '../components/Logo';
import WeatherWidget from '../components/WeatherWidget';
import SpotifyButton from '../components/SpotifyButton';
import LIFXButton from '../components/LIFXButton';


const axios = require('axios');

class Main extends Component {
    state = {
        currentCity: "Atlanta"
        //HAI I SET MY STATE TO THIS. 
    }
    
    // componentDidMount() {
        
            //HAI I"M THE AXIOS CALL. 
            //HAI JUST DO THIS.SETSTATE WITH ME :^)
    // }

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