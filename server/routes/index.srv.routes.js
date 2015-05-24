var indexCtrl = require('../ctrl/index.srv.ctrl');

module.exports = function(app) {
    app.get('/', indexCtrl.render);
};
