const router = require('express').Router();
const weatherController = require('../../controllers/weatherController');

router
    .route('/')
    .get(weatherController.getWeather);

module.exports = router;