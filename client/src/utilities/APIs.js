import axios from 'axios';

export default {
    getWeather: function (city) {
        return axios.get('/api/weather', { params: { q: city } });
    },
    lifx: function (mood) {
        return axios.get('/api/lights')
    },
    changeSong: function (mood) {
        return axios.post('/api/music', mood)
    }
}