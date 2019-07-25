const session = require('express-session');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const db = require('./models/history');
const express = require('express');
const app = express();
require('dotenv').config();

// export a function that receives the Express app we will configure for Passport
module.exports = (app) => {
    passport.serializeUser(function(user, done) {
        console.log('hi');
        done(null, user);
      });
      
      passport.deserializeUser(function(obj, done) {
        done(null, obj);
      });
      
      // Use the SpotifyStrategy within Passport.
      //   Strategies in Passport require a `verify` function, which accept
      //   credentials (in this case, an accessToken, refreshToken, expires_in
      //   and spotify profile), and invoke a callback with a user object.
      passport.use(
        new SpotifyStrategy(
          {
            clientID: process.env.SPOTIFY_ID,
            clientSecret: process.env.SPOTIFY_KEY,
            callbackURL: `${process.env.APP_BASE_URL}/auth/spotify/callback`
        },
          function(accessToken, refreshToken, expires_in, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function() {
              // To keep the example simple, the user's spotify profile is returned to
              // represent the logged-in user. In a typical application, you would want
              // to associate the spotify account with a user record in your database,
              // and return that user instead.
              return done(null, profile);
            });
          }
        )
      );
}

  // initialize passport. this is required, after you set up passport but BEFORE you use passport.session (if using)
  app.use(passport.initialize());
  // only required if using sessions. this will add middleware from passport
  // that will serialize/deserialize the user from the session cookie and add
  // them to req.user
  app.use(passport.session());