import Movie from '../movies';

const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const findMovieFromTMDB = async (tmdbId) => {
  const url = `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${REACT_APP_TMDB_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const findMovieById = async (tmdbId) => {
  let movie = await Movie.findOne({ tmdbId });
  if (!movie) {
    const tmdbMovie = await findMovieFromTMDB(tmdbId);
    movie = new Movie({
      tmdbId: tmdbMovie.id,
      title: tmdbMovie.title,
      overview: tmdbMovie.overview,
      releaseDate: tmdbMovie.release_date,
      genres: tmdbMovie.genres.map((genre) => genre.name),
      posterPath: tmdbMovie.poster_path,
      backdropPath: tmdbMovie.backdrop_path,
    });
    await movie.save();
  }
  return movie;
};