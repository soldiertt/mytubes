var User = require('mongoose').model('User');

var getErrorMessage = function (err) {
    var message = '',
        errName;
    if (err.code) {
        switch (err.code) {
        case 11000:
        case 11001:
            message = 'Username already exists';
            break;
        default:
            message = 'Something went wrong';
        }
    } else {
        for (errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }
    return message;
};

exports.signin = function(req, res) {
  res.send(req.user);
};

exports.signup = function (req, res, next) {
   var user = new User(req.body);
   var message = null;
   user.provider = 'local';
   user.save(function (err) {
      if (err) {
         var message = getErrorMessage(err);
         res.status(400).send({error: message});
      } else {
         req.login(user, function (err) {
            if (err) {
               return next(err);
            }
            res.send(user);
         });
      }
   });
};

exports.signout = function (req, res) {
   req.logout();
   res.sendStatus(200);
};

// MIDDLEWARE to require authentication for any route
// do not use on index to at least manage login redirection.
exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
    }
    next();
};
