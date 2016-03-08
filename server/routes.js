'use strict';
var path = require('path');
var config = require('./config/environment');

module.exports = function (app) {
    app.use('/auth', require('./auth'));
    app.use('/api/users', require('./api/user'));
    app.use('/client', require('./api/client'));
    app.use('/product', require('./api/product'));
    app.use('/reset', require('./api/reset'));

    app.use('/web', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/web/', 'login.html'));
    });
    app.use('/clients', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/web/', 'clients.html'));
    });
    app.use('/products', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/web/', 'products.html'));
    });
    app.get('/ng1/*', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/ng1/', 'index.html'));
    });
    app.get('/*', function (req, res) {
        res.sendFile(path.join(config.root, 'apps/web/', 'landing.html'));
    });
};