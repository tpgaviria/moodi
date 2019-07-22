const axios = require('axios');

module.exports = {
    getWeather: function(req, res) {
        const CITY = req;
        const KEY = process.env.WEATHER_KEY;    
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${KEY}`)
            .then(results => console.log(results))
            .catch(console.log('error getting weather'))
    }
}