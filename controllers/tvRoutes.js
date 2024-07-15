import { findTVById } from '../models/dao/movies';

export default function MovieRoutes(app) {
  const getTVById = async (req, res) => {
    try {
      const { tmdbId } = req.params;
      const tvShow = await findTVById(tmdbId);
      res.json(tvShow);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get('/tv/:tmdbId', getTVById);
}
