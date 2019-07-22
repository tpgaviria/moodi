const router = require('express').Router();
const weatherController = require('../../controllers/weatherController.js');

router
    .route('/')
    .get(weatherController.getWeather);

module.exports = router;