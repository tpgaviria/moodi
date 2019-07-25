const router = require('express').Router();
// const spotifyController = require('../../controllers/spotifyController.js');
const passport = require('passport');
// router
//     .route('/', function(req, res) {
//         console.log('hi')
//     })
//     .get(passport.authenticate('spotify', {
//         scope: ['user-read-email', 'user-read-private'],
//         showDialog: true
//       }),
//       function(req, res) {
//         // The request will be redirected to spotify for authentication, so this
//         // function will not be called.
//       });

// router
//     .route('/login')
//     .get(spotifyController.login);

module.exports = router;