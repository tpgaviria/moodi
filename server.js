const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
// const weatherroute = require('./routes/api/weather');
const app = express();
const PORT = process.env.PORT || 5000;
// require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
};

// app.get('/api/weather', function (req, res) {
//     const CITY = req;
//     const KEY = process.env.WEATHER_KEY;
//     console.log('hi');
//     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${KEY}`)
//         .then(results => console.log(results))
//         .catch(console.log('error getting weather from weather controller'))
// });

app.use(routes);
// app.get('/api/weather', (req, res) => console.log('do it!'));
// app.use('/api/weather', weatherroute);

// mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true })

app.listen(PORT, function () {
    console.log(`Back end server on port ${PORT}`);
})