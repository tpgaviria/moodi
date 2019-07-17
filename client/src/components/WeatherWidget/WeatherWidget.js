import React from 'react';
import './WeatherWidget.css';

class WeatherWidget extends React.Component {
    state = {
        "location": "Atlanta"
    }

    render() {
        return (
            <div className="media weather">
                <img src="..." className="mr-3" alt="..." />
                <div className="media-body">
                    <h5 className="mt-0">Media heading</h5>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
            </div>
        );
    }
}

export default WeatherWidget;