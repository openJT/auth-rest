'use strict';
var path = require('path');
var config = require('./config/environment');

module.exports = function (app) {
    app.use('/auth-rest/auth', require('./auth'));
    app.use('/auth-rest/api/users', require('./api/user'));
    app.use('/auth-rest/client', require('./api/client'));
    app.use('/auth-rest/product', require('./api/product'));
    app.use('/auth-rest/reset', require('./api/reset'));

    app.use('/auth-rest/web', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/web/', 'login.html'));
    });
    app.use('/auth-rest/clients', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/web/', 'clients.html'));
    });
    app.use('/auth-rest/products', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/web/', 'products.html'));
    });
    app.get('/auth-rest/ng1/*', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/ng1/', 'index.html'));
    });
    app.get('/*', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/web/', 'landing.html'));
    });
};