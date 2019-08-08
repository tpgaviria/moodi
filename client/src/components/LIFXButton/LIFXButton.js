import React, { Component } from 'react';
import './LIFXButton.css';
// import * as $ from 'jquery';
import API from '../../utilities/APIs'
require('dotenv').config();


class LIFXButton extends Component {

    state = {
        synced: false,
        mode: this.props.mode
    }

    data = {
        lightData: null,
        selectedLights: ["d073d53e1ee4", "d073d53e4256"]
    }

    getLifxData(mood) {
        this.setState({ synced: this.props.synced });
        if (this.state.synced) {
            API.lifx()
                .then(res => {
                    this.props.handleLifxSynced();
                    this.data.lightData = res.data;
                    this.changeLights(mood);
                    this.setState({ synced: true, mode: mood });
                })
        }
    }

    changeLights(mood) {
        API.changeLights(mood)
            .then(res => {
                console.log('hi')
            })
    }


    componentDidMount() {
        if (this.state.mode) {
            this.changeLights(this.state.mode)
        }
        // if (this.state.weather) {
        //     this.getLifxData();
        // }
    }
    componentDidUpdate() {
        if (this.state.mode) {
            this.changeLights(this.state.mode)
        }
        // if (this.state.weather) {
        //     this.getLifxData();
        // }
    }

    getDerivedStateFromProps() {
        this.changeLights(this.props.mode);
    }

    render() {
        console.log(this.props);
        console.log('mood ' + this.state.mode)
        return (
            <div>
                {!this.state.synced && this.state.mode && (
                    <button className="btn-lg btn-success" onClick={() => this.getLifxData(this.state.mode)}>Sync Lights</button>
                )}
                {/* {!this.state.synced && !this.state.weather && this.state.mood && (
                    <button className="btn-lg btn-success" onClick={() => this.getLifxData(this.state.mode)}>Sync Lights</button>
                )} */}

                {this.state.synced && (
                    <h1>synced</h1>)}
            </div>
        );
    }
}

export default LIFXButton;