const mongoose = require('mongoose');

const TV = require('./schema/tv');

module.exports = mongoose.model('TV', TV);
