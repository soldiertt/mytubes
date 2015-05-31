process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./server/config/mongoose'),
    express = require('./server/config/express'),
    passport = require('./server/config/passport');

var db = mongoose(),
    app = express(db),
    passport = passport(),
    port = process.env.OPENSHIFT_NODEJS_PORT || 3000,
    ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.listen(port, ipaddress);
module.exports = app;
console.log('Server running at http://' + ipaddress + ':' + port + '/');
