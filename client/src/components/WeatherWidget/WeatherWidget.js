import React, { Component } from 'react';
import './WeatherWidget.css';




class WeatherWidget extends Component {

    // componentDidMount() {
    //     search = query => (
    //         return fetch()
    //     )
    // }

    // console.log(this.state);
    render() {
        return (
            <div className="media weather" >
                {/* <img src="..." className="mr-3" alt="..." /> */}
                < div className="media-body" >
                    {/* <h5 className="mt-0">Media heading</h5> */}
                    <p>{JSON.stringify(this.props.data)}</p>
                    <p>City: {this.props.data.currentCity}</p>
                    <p>Time: {this.props.data.currentTime}</p>
                    <p>Weather: {this.props.data.weatherMain}</p>
                    <p>Description: {this.props.data.weatherDesc}</p>
                    <p>Temp: {this.props.data.currentTemp}</p>
                    Cras  sit amet nibh libero, in gravida nulla.Nulla vel metus scelerisque ante sollicitudin.Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.Fusce condimentum nunc ac nisi vulputate fringilla.Donec lacinia congue felis in faucibus.
                </div >
            </div >
        )
    }
}

export default WeatherWidget;