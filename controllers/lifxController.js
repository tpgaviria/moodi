const axios = require('axios');
require('dotenv').config();
const KEY = process.env.LIFX_KEY;
const moodData = require('../client/src/moodData.json');

module.exports = {
    getToken: function (req, res) {
        const config = {
            method: 'get',
            url: 'https://api.lifx.com/v1/lights/all',
            headers: { 'Authorization': 'Bearer ' + KEY }
        }
        axios(config)
            .then(results => {
                res.json(results.data);
            })
    },
    changeLights: function (req, res) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + KEY
        };
        let mood = req.query[0];
        mood = mood.toLowerCase();
        // console.log(mood);
        // console.log(moodData);
        let color1 = '';
        let color2 = '';
        // let color2 = moodData.mode.mood.colors[1];
        // console.log(color2);

        for (let i = 0; i < moodData.length; i++) {
            if (moodData[i].mode === mood) {
                console.log(moodData[i].colors);
                color1 = moodData[i].colors[0];
                color2 = moodData[i].colors[1];
            }
        }


        // axios.put('https://api.lifx.com/v1/lights/states', {
        //     headers: {
        //         'Authorization': 'Bearer ' + 'cc2d1b184af90af321967933dcd930bc924db46973679ccd75d2fa43953d0c49',
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Methods": "DELETE, GET, OPTIONS, PATCH, POST, PUT",
        //         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization”
        //     },
        //     data: params
        // })
        //     .then(results => {
        //         console.log('lifx success')
        //     })
        //     .catch(err => console.log(err))

        axios({
            method: 'put',
            url: 'https://api.lifx.com/v1/lights/states',
            headers: headers,
            data: {
                "states": [
                    {
                        "selector": "d073d53e1ee4",
                        "power": "on",
                        "color": color1,
                        "brightness": 1.0
                    },
                    {
                        "selector": "d073d53e4256",
                        "power": "on",
                        "color": color2,
                        "brightness": 1.0
                    }
                ],
                "fast": true
            }
        })
            .then(results => {
                console.log('lifx success')
            })
            .catch(err => console.log(err))

    }
}