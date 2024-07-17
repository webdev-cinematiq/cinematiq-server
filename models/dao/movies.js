import db from '../../database/index.js';

const movies = db.movies;

const findById = (array, id) => array.find((item) => item._id === id);

export const findAllMovies = async () => {
  return movies;
};

export const findMovieById = async (id) => {
  return findById(movies, id);
};

export const findMovieByTitle = async (title) => {
  return movies.find((movie) => movie.title === title);
};

export const createMovie = async (movieData) => {
  const newMovie = { _id: `movie${movies.length + 1}`, ...movieData };
  movies.push(newMovie);
  return newMovie;
};

export const updateMovie = async (id, movieData) => {
  const movieIndex = movies.findIndex((movie) => movie._id === id);
  if (movieIndex === -1) {
    throw new Error('Movie not found');
  }
  movies[movieIndex] = { ...movies[movieIndex], ...movieData };
  return movies[movieIndex];
};

export const deleteMovie = async (id) => {
  const movieIndex = movies.findIndex((movie) => movie._id === id);
  if (movieIndex === -1) {
    throw new Error('Movie not found');
  }
  const deletedMovie = movies.splice(movieIndex, 1);
  return deletedMovie[0];
};
