var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    console.log(config.db);
    var db = mongoose.connect(config.db);
    require('../model/user.srv.model');
    return db;
};