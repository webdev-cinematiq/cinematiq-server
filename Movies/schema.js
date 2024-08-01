import mongoose from 'mongoose';

const movieSchema = mongoose.Schema(
  {
    backdrop_path: { type: String },
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GenreModel' }],
    original_language: { type: String },
    overview: { type: String },
    popularity: { type: Number },
    poster_path: { type: String },
    release_date: { type: Date },
    runtime: { type: Number },
    vote_average: { type: Number },
    vote_count: { type: Number },
  },
  { collection: 'movies' }
);

export default movieSchema;
