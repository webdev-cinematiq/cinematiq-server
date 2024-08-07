import * as dao from './dao.js';

export default function CriticRoutes(app) {
  const createCritic = async (req, res) => {
    const critic = await dao.createCritic(req.body);
    res.json(critic);
  };

  const deleteCritic = async (req, res) => {
    const status = await dao.deleteCritic(req.params.criticId);
    res.json(status);
  };

  const findAllCritics = async (req, res) => {
    const critics = await dao.findAllCritics();
    res.json(critics);
  };

  const updateCritic = async (req, res) => {
    const { criticId } = req.params;
    const status = await dao.updateCritic(criticId, req.body);
    res.json(status);
  };

  app.post('/api/:author/critics', createCritic);
  app.get('/api/critics', findAllCritics);
  app.put('/api/critics/:criticId', updateCritic);
  app.delete('/api/critics/:criticId', deleteCritic);
}
