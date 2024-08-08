import * as dao from './dao.js';

export default function MovieRoutes(app) {
  const findAndUpdateMovieCollections = async (req, res) => {
    const { id } = req.params;
    const { movieData, collectionId } = req.body;

    try {
      const updatedMovie = await dao.findAndUpdateMovieCollections(
        id,
        movieData,
        collectionId
      );

      if (!updatedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      res.json({ _id: updatedMovie._id });
    } catch (error) {
      console.error('Error updating movie collections:', error);
      res.status(500).json({ error: 'Failed to update movie collections' });
    }
  };

  const findAndUpdateMovieReviews = async (req, res) => {
    const { id } = req.params;
    const { movieData, reviewId } = req.body;

    try {
      const updatedMovie = await dao.findAndUpdateMovieReviews(
        id,
        movieData,
        reviewId
      );

      if (!updatedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      res.json({ _id: updatedMovie._id });
    } catch (error) {
      console.error('Error updating movie reviews:', error);
      res.status(500).json({ error: 'Failed to update movie reviews' });
    }
  };

  const findAndUpdateMovie = async (req, res) => {
    const { id } = req.params;
    const movie = await dao.findAndUpdateMovie(id, req.body);
    res.json(movie._id);
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
  app.put('/api/movies/:id', findAndUpdateMovie);
  app.put('/api/movies/:id/collections', findAndUpdateMovieCollections);
  app.put('/api/movies/:id/reviews', findAndUpdateMovieReviews);
  app.get('/api/movies/details/:movieId', findMovieById);
  app.get('/api/movies/tmdb/:id', findMovie);
  app.get('/api/movies/:title', findMovieByTitle);
}
