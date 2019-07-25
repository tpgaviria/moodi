const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');
// const spotifyRoutes = require('./api/spotify');

router.use('/api', apiRoutes);
router.get('/auth', function (req, res) {
    console.log('hi')
});
// router.use('/auth/spotify', function(req, res) {
//     console.log('hi')
// });


// router.use('/auth/spotify', spotifyRoutes);

// router.get('/auth/spotify', function(req, res) {
//     console.log('hi')
// })

// router.use((req, res) =>
//     res.sendFile(path.join(__dirname, '../client/build/index.html')));

module.exports = router;