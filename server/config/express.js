/**
 * Express configuration
 */
'use strict';
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var favicon = require('serve-favicon');
var session = require('express-session');

module.exports = function (app) {
    var env = app.get('env');
    app.set('view engine', 'html');
    app.use(favicon('apps/favicon.ico'));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    if ('production' === env) {
        app.use(express.static(path.join(config.root, 'apps')));
        app.use(express.static(path.join(config.root, 'assets')));
        app.use(express.static(path.join(config.root, 'node_modules')));
    }

    if ('development' === env || 'test' === env) {
        app.use(express.static(path.join(config.root, 'apps')));
        app.use(express.static(path.join(config.root, 'assets')));
        app.use(express.static(path.join(config.root, 'node_modules')));
        app.use(morgan('dev'));
        app.use(errorHandler());
    }
};
