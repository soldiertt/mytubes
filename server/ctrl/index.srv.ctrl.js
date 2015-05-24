exports.render = function (req, res) {
    res.render('index', {
        title: 'MyTubes',
        user: JSON.stringify(req.user)
    });
};
