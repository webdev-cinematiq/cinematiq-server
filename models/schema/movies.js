const mongoose = require('mongoose');

module.exports = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    director: { type: String, required: true },
    genre: { type: String, required: true },
    release_date: { type: Date, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
  },
  { collection: 'Movie' }
);
