const axios = require('axios');
require('dotenv').config();

module.exports = {
    getToken: function (req, res) {
        const KEY = process.env.LIFX_KEY;
        const config = {
            method: 'get',
            url: 'https://api.lifx.com/v1/lights/all',
            headers: { 'Authorization': 'Bearer ' + KEY }
        }
        axios(config)
            .then(results => {
                res.json(results.data);
            })
    }
}