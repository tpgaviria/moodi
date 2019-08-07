const path = require('path');
const router = require('express').Router();
const lifxRoutes = require('./lifx');
// const spotifyRoutes = require('./spotify');
const weatherRoutes = require('./weather');

router.use('/weather', weatherRoutes);
router.use('/lights', lifxRoutes);

// router.use('/music', spotifyRoutes);

// router.get('/weather', (req, res) => {
//     console.log('worked');
// })
// router.use('/music', spotifyRoutes);

// router.use(function (req, res) {
//     res.sendFile(path.join(__dirname, '../../client/build/index.html'))
// })

module.exports = router;