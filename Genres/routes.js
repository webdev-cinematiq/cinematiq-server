import * as dao from './dao.js';

export default function GenreRoutes(app) {
  const updateGenre = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateGenre(id, req.body);
    res.json(status);
  };

  const findAllGenres = async (req, res) => {
    const { name } = req.query;

    if (name) {
      const genres = await dao.findGenreByPartialName(name);
      res.json(genres);
      return;
    }

    const genres = await dao.findAllGenres();
    res.json(genres);
  };

  const findGenreById = async (req, res) => {
    const genre = await dao.findGenreById(req.params.genreId);
    res.json(genre);
  };

  const findGenre = async (req, res) => {
    const genre = await dao.findGenre(req.params.value);
    res.json(genre);
  };

  const findGenreByName = async (req, res) => {
    const genre = await dao.findGenresByTitle(req.params.name);
    res.json(genre);
  };

  app.get('/api/genres', findAllGenres);
  app.put('/api/genres/id', updateGenre);
  app.get('/api/genres/:genreId', findGenreById);
  app.get('/api/genres/tmdb/:value', findGenre);
  app.get('/api/genres/:name', findGenreByName);
}
