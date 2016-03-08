"use strict";
var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    nodemon = require('gulp-nodemon'),
    bs = require('browser-sync').create();

gulp.task('default', function () {
    bs.init({
        proxy: "localhost:9000",
        open: false
    });
    bs.watch(path.join(__dirname, 'apps/**/*'), function (event, file) {
        if (event === "change") {
            setTimeout(function () {
                bs.reload();
            }, 1500)
        }
    });
    nodemon({script: 'server/app.js', ext: 'js', watch: ['server/**/*.*']})
        .on('restart', function () {
            setTimeout(function () {
                bs.reload();
            }, 1500)
        });
});
