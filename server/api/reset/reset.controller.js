var seed = require('../../config/seed');

exports.reset = function (req, res) {
    seed.seed();
    res.status(200).json()
};