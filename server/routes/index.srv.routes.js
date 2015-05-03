module.exports = function(app) {
    var index = require('../ctrl/index.srv.ctrl');
    app.get('/', index.render);
};