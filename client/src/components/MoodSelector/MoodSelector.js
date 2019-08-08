import React, { Component } from 'react';
// import * as $ from 'jquery';
import './MoodSelector.css'

class MoodSelector extends Component {
    state = {
        mood: "default"
    }

    // componentDidUpdate() {
    //     if (this.state.mood !== 'default') {
    //         this.props.onChange(this.state.mood)
    //     }
    // }

    render() {
        return (
            <div>
                <form>
                    <label>Playlist created based on current weather. Want to choose a mood instead?</label>
                    <select value={this.state.mood} onChange={(event) => {
                        this.props.onChange(event);
                        this.setState({ mood: event.target.value });
                    }}>
                        <option value="default" disabled>Choose one</option>
                        <option value="happy">Happy</option>
                        <option value="depressed">Depressed</option>
                        <option value="dance party">Dance Party</option>
                        <option value="quiet study">Quiet Study</option>
                    </select>
                </form>
            </div>
        )
    }
}
export default MoodSelector;
