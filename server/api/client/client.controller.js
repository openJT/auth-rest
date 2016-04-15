'use strict';

var passport = require('passport');
var _ = require('lodash');
var Client = require('./client.model');
var socket;

exports.socket = function (io) {
    socket = io;
};

exports.index = function (req, res) {
    Client.find(function (err, clients) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(clients)
    });
};

// Get a single client
exports.show = function (req, res) {
    Client.findById(req.params.id, function (err, client) {
        if (err) { return handleError(res, err); }
        if (!client) { return res.send(404); }
        return res.status(200).json(client)
    });
};

// Creates a new client in the DB.
exports.create = function (req, res) {
    Client.create(req.body, function (err, client) {
        if (err) { return handleError(res, err); }
        socket.of('/admin').emit('addClient', client);
        return res.status(201).json(client)
    });
};

// Updates an existing client in the DB.
exports.update = function (req, res) {
    console.log(req.body);
    Client.findById(req.body._id, function (err, client) {
        if (req.body._id) { delete req.body._id; }
        if (err) { return handleError(err); }
        if (!client) { return res.send(404); }
        var updated = _.merge(client, req.body);
        updated.save(function (err, client) {
            if (err) { return handleError(err); }
            socket.of('/admin').emit('updateClient', client);
            return res.status(200).json()
        });
    });
};

// Deletes a client from the DB.
exports.destroy = function (req, res) {
    Client.findById(req.params.id, function (err, client) {
        if (err) { return handleError(res, err); }
        if (!client) { return res.status(404).json(); }
        client.remove(function (err) {
            if (err) { return handleError(res, err); }
            socket.of('/admin').emit('deleteClient', client);
            return res.status(204).json()
        });
    });
};

function handleError(res, err) {
    return res.status(500).json(err)
}