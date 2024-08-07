import * as dao from './dao.js';

export default function CollectionRoutes(app) {
  const createCollection = async (req, res) => {
    const collection = await dao.createCollection(req.body);
    res.json(collection);
  };

  const deleteCollection = async (req, res) => {
    const status = await dao.deleteCollection(req.params.collectionId);
    res.json(status);
  };

  const findAllCollections = async (req, res) => {
    const { title } = req.query;

    if (title) {
      const collections = await dao.findCollectionByPartialTitle(title);
      res.json(collections);
      return;
    }

    const collections = await dao.findAllCollections();
    res.json(collections);
  };

  const findCollection = async (req, res) => {
    const { author, titleId } = req.params;
    const collection = await dao.findCollection(author, titleId);
    res.json(collection);
  };

  const findCollectionById = async (req, res) => {
    const collection = await dao.findCollectionById(req.params.collectionId);
    res.json(collection);
  };

  const findCollectionByTitle = async (req, res) => {
    const collection = await dao.findCollectionsByTitle(req.params.title);
    res.json(collection);
  };

  const updateCollection = async (req, res) => {
    const { collectionId } = req.params;
    const status = await dao.updateCollection(collectionId, req.body);
    res.json(status);
  };

  const findCollectionByAuthor = async (req, res) => {
    const { author } = req.params;
    const collection = await dao.findCollectionsByAuthor(author);
    res.json(collection);
  };

  app.post('/api/:author/collections', createCollection);
  app.get('/api/collections', findAllCollections);
  app.get('/api/:author/collections', findCollectionByAuthor);
  app.get('/api/collections/:title', findCollectionByTitle);
  app.get('/api/:author/collection/:titleId', findCollection);
  app.put('/api/:author/collections/:collectionId', updateCollection);
  app.delete('/api/:author/collections/:collectionId', deleteCollection);
}
