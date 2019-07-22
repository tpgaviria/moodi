const SpotifyStratgey = require('passport-spotify').Strategy;
require('dotenv').config();

passport.use(
    new SpotifyStratgey({
        clientID: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_KEY,
        callbackURL: 'http://localhost:3000/callback'
    }, function (accessToken, refreshToken, expires_in, profile, done) {
        URLSearchParams.findOrCreate({ spotifyId: profile.id }, function (err, user) {
            return done(err, user);
        })
    })
)