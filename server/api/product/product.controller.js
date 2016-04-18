'use strict';

var _ = require('lodash');
var Product = require('./product.model');
var socket;

exports.socket = function (io) {
    socket = io;
};
exports.index = function (req, res) {
    Product.find({}, '_id name', function (err, products) {
        if (err) { return handleError(res, err) }
        return res.status(200).json(products)
    });
};

// Get a single product
exports.show = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) { return handleError(res, err); }
        if (!product) { return res.send(404); }
        return res.status(200).json(product)
    });
};

// Creates a new product in the DB.
exports.create = function (req, res) {
    Product.create(req.body, function (err, product) {
        if (err) { return handleError(res, err); }
        socket.of('/admin').emit('addProduct', product);
        return res.status(201).json(product)
    });
};

// Updates an existing product in the DB.
exports.update = function (req, res) {
    console.log(req.body);
    Product.findById(req.body._id, function (err, product) {
        if (req.body._id) { delete req.body._id; }
        if (err) { return handleError(err); }
        if (!product) { return res.send(404); }
        var updated = _.merge(product, req.body);
        updated.save(function (err, product) {
            if (err) { return handleError(err); }
            socket.of('/admin').emit('updateProduct', product);
            return res.status(200).json()
        });
    });
};
// Deletes a product from the DB.
exports.destroy = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) { return handleError(res, err); }
        if (!product) { return res.status(404).json(); }
        product.remove(function (err) {
            if (err) { return handleError(res, err); }
            socket.of('/admin').emit('deleteProduct', product);
            return res.status(204).json()
        });
    });
};
function handleError(res, err) {
    return res.status(500).json(err)
}