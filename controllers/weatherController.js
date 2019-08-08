const axios = require('axios');
require('dotenv').config();

module.exports = {
    getWeather: function (req, res) {
        const { id: params } = req;
        const KEY = process.env.WEATHER_KEY;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${KEY}&id=4346455`)
            .then(results => {
                res.json(results.data);
            })
    }
}