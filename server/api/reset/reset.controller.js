var seed = require('../../config/seed');
var socket;

exports.socket = function (io) {
    socket = io;
};
exports.reset = function (req, res) {
    seed.seed();
    socket.of('/admin').emit('reset');
    res.status(200).json()
};