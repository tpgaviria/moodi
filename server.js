const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
// const weatherroute = require('./routes/api/weather');
const app = express();
const PORT = process.env.PORT || 5000;
// const session = require('express-session');
const passport = require('passport');
// const SpotifyStrategy = require('passport-spotify/lib/passport-spotify/index').Strategy;
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require('./passport')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
};

// app.get('/auth/spotify', function (req, res) {
//         console.log('hi')
//     }
    // passport.authenticate('spotify', {
    //     scope: ['user-read-email', 'user-read-private'],
    //     showDialog: true
    // }),
    // function (req, res) {
    //     // The request will be redirected to spotify for authentication, so this
    //     // function will not be called.
    // }
// );

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// app.get(
//     '/callback',
//     passport.authenticate('spotify', { failureRedirect: '/login' }),
//     function (req, res) {
//         res.redirect('/');
//     }
// );

// app.get('/logout', function (req, res) {
//     req.logout();
//     res.redirect('/');
// });


app.use(routes);

// mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true })

app.listen(PORT, function () {
    console.log(`Back end server on port ${PORT}`);
})