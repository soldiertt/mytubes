var userCtrl = require('../ctrl/user.srv.ctrl'),
    videoCtrl = require('../ctrl/video.srv.ctrl');

module.exports = function (app) {
    app.route('/api/video')
        .get(videoCtrl.list)
        .post(userCtrl.requiresLogin, videoCtrl.create);
    app.route('/api/video/:videoId')
        .get(videoCtrl.read)
        .put(userCtrl.requiresLogin, videoCtrl.hasAuthorization, videoCtrl.update)
        .delete(userCtrl.requiresLogin, videoCtrl.hasAuthorization, videoCtrl.delete);
    app.param('videoId', videoCtrl.videoByID);
};
