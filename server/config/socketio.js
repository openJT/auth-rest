/**
 * Socket.io configuration
 */

'use strict';
var config = require('./environment');
var jwt = require('jsonwebtoken');
var User = require('../api/user/user.model');
var Product = require('../api/product/product.model');
var Client = require('../api/client/client.model');

module.exports = function (io) {
    // 2. Require authentication here:
    io.use(require('socketio-jwt').authorize({
        secret: config.secrets.session,
        handshake: true
    }));

    io.of('/admin')
        .use(function (socket, next) {
            jwt.verify(socket.request._query.token, config.secrets.session, socket, function (err, decoded) {
                if (err) {
                    var error = new UnauthorizedError('invalid_token', err);
                    next(error);
                }
                User.findById(decoded._id, function (err, user) {
                    if (err) return next(err);
                    if (!user) return next(err);
                    else next();
                });
            });
        })
        .on('connection', function (socket) {
            onConnect(socket);
            socket.on('disconnect', function () {
                onDisconnect(socket);
            });
        });
};
function onConnect(socket) {
    Product.find({}, '_id name', function (err, products) {
        Client.find(function (err, clients) {
            socket.emit('init', { clients: clients, products: products });
        });
    });


    console.log('socket onConnect');
}
function onDisconnect(socket) {
    console.log('socket onDisconnect');
}

