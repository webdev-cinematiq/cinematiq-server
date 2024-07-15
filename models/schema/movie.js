const mongoose = require('mongoose');

module.exports = mongoose.Schema(
  {
    tmdbId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    overview: { type: String },
    releaseDate: { type: String },
    genres: [String],
    posterPath: { type: String },
    backdropPath: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'Movie' }
);
