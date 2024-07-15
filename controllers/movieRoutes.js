import { findMovieById } from '../models/dao/movies';

export default function MovieRoutes(app) {
  const getMovieById = async (req, res) => {
    try {
      const { tmdbId } = req.params;
      const movie = await findMovieById(tmdbId);
      res.json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get('/movie/:tmdbId', getMovieById);
  app.get('/tv/:tmdbId', getTVById);
}
