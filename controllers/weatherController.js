const axios = require('axios');
require('dotenv').config();

module.exports = {
    getWeather: function (req, res) {
        const { query: params } = req;
        const KEY = process.env.WEATHER_KEY;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${KEY}`, { params })
            .then(results => {
                console.log(results.data);
                console.log(results.data.weather[0].main);
                console.log(results.data.main.temp);
                console.log(results.data.weather[0].description);
                console.log(new Date().getHours() + ":" + new Date().getMinutes());
                res.json(results.data);
            })
            .catch(console.log('error getting weather from weather controller'))
    }
}