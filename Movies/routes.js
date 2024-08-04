import * as dao from './dao.js';

export default function MovieRoutes(app) {
  const updateMovie = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateMovie(id, req.body);
    res.json(status);
  };

  const findAllMovies = async (req, res) => {
    const { title } = req.query;

    if (title) {
      const movies = await dao.findMovieByPartialTitle(title);
      res.json(movies);
      return;
    }

    const movies = await dao.findAllMovies();
    res.json(movies);
  };

  const findMovieById = async (req, res) => {
    const movie = await dao.findMovieById(req.params.movieId);
    res.json(movie);
  };

  const findMovie = async (req, res) => {
    const movie = await dao.findMovie(req.params.id);
    res.json(movie);
  };

  const findMovieByTitle = async (req, res) => {
    const movie = await dao.findMoviesByTitle(req.params.title);
    res.json(movie);
  };

  app.get('/api/movies', findAllMovies);
  app.put('/api/movies/id', updateMovie);
  app.get('/api/movie/details/:movieId', findMovieById);
  app.get('/api/movies/tmdb/:id', findMovie);
  app.get('/api/movies/:title', findMovieByTitle);
}
