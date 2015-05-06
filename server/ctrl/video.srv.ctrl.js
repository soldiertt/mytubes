var Video = require('mongoose').model('Video');

var getErrorMessage = function (err) {
    var message = '',
        errName;

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Video already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else if (err.errors) {
        for (errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    } else {
        message = 'Unknown server error';
    }
    return message;
};

exports.create = function (req, res) {
    var video = new Video(req.body);
    video.user = req.user;
    video.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(video);
        }
    });
};

exports.list = function (req, res) {
    Video.find().populate('user', 'firstName lastName fullName ').exec(function (err, videos) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(videos);
        }
    });
};

exports.videoByID = function (req, res, next, id) {
    Video.findById(id).populate('user', 'firstName lastName fullName ').exec(function (err, video) {
        if (err) {
            return next(err);
        }
        if (!video) {
            return next(new Error('Failed to load video ' + id));
        }
        req.video = video;
        next();
    });
};

exports.read = function (req, res) {
    res.json(req.video);
};

exports.update = function (req, res) {
    var video = req.video;
    video.ref = req.body.ref;
    video.tags = req.body.tags;
    video.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(video);
        }
    });
};

exports.delete = function (req, res) {
    var video = req.video;
    video.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(video);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.video.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
