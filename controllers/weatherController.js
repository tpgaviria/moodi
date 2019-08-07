const axios = require('axios');
require('dotenv').config();

module.exports = {
    getWeather: function (req, res) {
        const { query: params } = req;
        const KEY = process.env.WEATHER_KEY;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${KEY}`, { params })
            .then(results => {
                res.json(results.data);
            })
    }
}