var users = require('../ctrl/user.srv.ctrl'),
    passport = require('passport');

module.exports = function (app) {
    app.post('/signup', users.signup);
    app.post('/signin', passport.authenticate('local'), users.signin);
    app.post('/signout', users.signout);
    app.get('/loggedin', function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
    });
};
