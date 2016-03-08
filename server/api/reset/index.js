
var express = require('express');
var auth = require('../../auth/auth.service');
var router = express.Router();
var controller = require('./reset.controller');

router.get('/', auth.isAuthenticated(), controller.reset);

module.exports = router;
