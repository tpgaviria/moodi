const passport = require('passport');

module.exports = {
    passport.authenticate('spotify', {
        scope: ['user-read-email', 'user-read-private'],
        showDialog: true
      }),
      function(req, res) {
        // The request will be redirected to spotify for authentication, so this
        // function will not be called.
      }
}