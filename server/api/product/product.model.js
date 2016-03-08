'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    name: {type:String, default:"No name"},
    price:  {type:Number, default:0},
    quantity: {type:Number, default:0},
    brand: {type:String, default:"NA"},
    model: {type:String, default:"NA"},
    origin: {type:String, default:"NA"},
    returnable: {type:Boolean, default:true},
    rating: {type:Number, default:0},
    description: {type:String, default:""}
});

module.exports = mongoose.model('Product', ProductSchema);