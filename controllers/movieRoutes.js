import {
  findAllMovies,
  findMovieById,
  findMovieByTitle,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../models/dao/movies.js';

export default function MovieRoutes(app) {
  const getAllMovies = async (req, res) => {
    try {
      const movies = await findAllMovies();
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const getMovieById = async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await findMovieById(id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const getMovieByTitle = async (req, res) => {
    try {
      const { title } = req.params;
      const movie = await findMovieByTitle(title);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const createNewMovie = async (req, res) => {
    try {
      const newMovie = await createMovie(req.body);
      res.status(201).json(newMovie);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  const updateExistingMovie = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedMovie = await updateMovie(id, req.body);
      if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json(updatedMovie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteExistingMovie = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMovie = await deleteMovie(id);
      if (!deletedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json({ message: 'Movie deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  // define routes
  app.get('/api/movies', getAllMovies);
  app.get('/api/movies/:id', getMovieById);
  app.get('/api/movies/title/:title', getMovieByTitle);
  app.post('/api/movies', createNewMovie);
  app.put('/api/movies/:id', updateExistingMovie);
  app.delete('/api/movies/:id', deleteExistingMovie);
}
