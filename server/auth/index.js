'use strict';

var express = require('express');
var config = require('../config/environment');
var User = require('../api/user/user.model');
var router = express.Router()
// Passport Configuration
require('./local/passport').setup(User, config);

router.use('/local', require('./local'));

module.exports = router;