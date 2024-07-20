const mongoose = require('mongoose');

module.exports = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    description: { type: String },
    created: { type: Date, required: true },
  },
  { collection: 'Collection' }
);
