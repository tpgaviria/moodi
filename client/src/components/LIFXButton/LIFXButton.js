import React, { Component } from 'react';
import './LIFXButton.css';
// import * as $ from 'jquery';
import API from '../../utilities/APIs'
require('dotenv').config();


class LIFXButton extends Component {

    state = {
        synced: false,
        mood: this.props.mood,
        weather: this.props.weather
    }

    data = {
        lightData: null,
        selectedLights: ["d073d53e1ee4", "d073d53e4256"]
    }

    getLifxData(mood) {
        API.lifx()
            .then(res => {
                this.props.handleLifxSynced();
                this.data.lightData = res.data;
                let lightSelector = this.data.selectedLights;
                console.log(lightSelector);
                this.changeLights(mood, lightSelector);
                this.setState({ synced: true });
            })
    }

    changeLights(mood) {
        let lightData = {
            "states":[
                {
                    "selector": "d073d53e1ee4",
                    "power": "on",
                    "color": "green",
                    "brightness": 1.0
                },
                {
                    "selector": "d073d53e4256",
                    "power": "on",
                    "color": "yellow",
                    "brightness": 1.0
                }
            ],
            "fast": true
        }
        API.changeLights(mood)
            .then(res => {
                console.log('hi')
            })
    }


    componentDidMount() {
        // if (this.state.weather) {
        //     this.getLifxData();
        // }
    }

    render() {
        return (
            <div>
                {!this.state.synced && (
                    <button className="btn-lg btn-success" onClick={() => this.getLifxData(this.state.weather)}>Sync Lights</button>
                )}

                {this.state.synced && (
                    <h1>synced</h1>)}
            </div>
        );
    }
}

export default LIFXButton;