var config = require('./config'),
    http = require('http'),
    express = require('express'),
    morgan = require('morgan'), // http request logger
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    passport = require('passport');

module.exports = function (db) {
    var app = express(),
        server = http.createServer(app),
        mongoStore = new MongoStore({
            mongooseConnection: db.connection
        });

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());
    
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));

    app.set('views', './server/views');
    app.set('view engine', config.viewEngine);

    app.use(passport.initialize());
    app.use(passport.session());

    require('../routes/index.srv.routes.js')(app);
    require('../routes/user.srv.routes.js')(app);
    require('../routes/video.srv.routes.js')(app);

    app.use(express.static('./client'));
    
    return server;
};
