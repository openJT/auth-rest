'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var config = require('./config/environment');
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, { path: '/auth-rest/socket.io' }).listen(server);
require('./config/socketio')(socketio);
require('./api/client/client.controller').socket(socketio);
require('./api/product/product.controller').socket(socketio);
require('./api/reset/reset.controller').socket(socketio);
require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if (config.seedDB) {
     require('./config/seed');
}
module.exports = app;