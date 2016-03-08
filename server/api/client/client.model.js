'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ClientSchema = new Schema({
    lastName: String,
    firstName: String,
    company: String,
    position: String

});

module.exports = mongoose.model('Client', ClientSchema);