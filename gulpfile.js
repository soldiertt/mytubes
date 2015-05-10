var gulp = require('gulp'),
    express = require('express'),
    less = require('gulp-less'),
    gls = require('gulp-live-server');

gulp.task('less', function () {
    gulp.src('client/static/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('client/static/css'));
});

gulp.task('default', ['watch', 'serve'], function () {
});

gulp.task('watch', function () {
    gulp.watch('client/static/less/*.less', ['less']);
});

gulp.task('serve', function () {
    //var server = gls([gls.script, 'public', 3000]);
    //var server = gls.new(['--lrmode', 'app.js']); //Use our express app
    var server = gls('server.js', {env: {LRMODE: 'true'}});
    server.start();

    gulp.watch(['client/static/css/*.css', 'client/**/views/*.html', 'client/**/*.js'], server.notify);
});
