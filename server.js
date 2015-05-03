process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./server/config/mongoose'),
    express = require('./server/config/express'),
    passport = require('./server/config/passport');

var db = mongoose(),
    app = express(db),
    passport = passport();

app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000/');