import React, { Component } from 'react';
import './LIFXButton.css';
// import * as $ from 'jquery';
import API from '../../utilities/APIs'
require('dotenv').config();


class LIFXButton extends Component {

    state = {
        synced: this.props.synced
    }

    data = {
        synced: false
    }

    getLifxToken = () => {
        API.lifx()
            .then(res => {
                console.log('ok');
                this.data.synced = true;
                this.props.handleLifxSynced(this.data.synced);
            })
    }

    render() {
console.log(this.props.synced);
        return (

            <div>
                {!this.props.synced && (
                    <button onClick={this.getLifxToken} className="btn-lg btn-success">
                    Sync with LIFX
        </button>
                )}
                {this.props.synced && (
                    <h1>synced</h1>
                )}
            </div>
        );
    }
}

export default LIFXButton;