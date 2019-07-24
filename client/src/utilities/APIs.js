import axios from 'axios';

export default {
    getWeather: function (city) {
        return axios.get('/api/weather', { params: { q: city } });
    },
    changeLight: function (mood) {
        return axios.post('/api/lights', mood)
    },
    changeSong: function (mood) {
        return axios.post('/api/music', mood)
    }
}