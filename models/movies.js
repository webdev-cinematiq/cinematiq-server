const mongoose = require('mongoose');

const Movie = require('./schema/movie');

module.exports = mongoose.model('Movie', Movie);
