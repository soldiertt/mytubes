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
    var queryObj = {user: req.user._id};
    if (req.query.tags) {
        queryObj.tags = {$all : req.query.tags};
    }
    Video.find(queryObj).populate('user', 'firstName lastName fullName ').exec(function (err, videos) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(videos);
        }
    });
};

exports.listUniqTags = function (req, res) {
    Video.aggregate([
            { "$match": { "user": req.user._id }},
            { "$project": { "tags":1 }},
            { "$unwind": "$tags" },
            { "$group": { "_id": "$tags", "count": { "$sum": 1 } }},
            { "$sort": { "count" : -1 } }
        ],
        function(err,result) {
            // Result is an array of documents
            res.json(result);
        }
    );
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
