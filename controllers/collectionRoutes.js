import {
  findAllCollections,
  findCollectionById,
  findCollectionsByTitle,
  findCollectionsByUserName,
  createCollection,
  updateCollection,
  deleteCollection,
} from '../models/dao/collections';

export default function CollectionRoutes(app) {
  const getAllCollections = async (req, res) => {
    try {
      const collections = await findAllCollections();
      res.json(collections);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const getCollectionById = async (req, res) => {
    try {
      const { cid } = req.params;
      const collection = await findCollectionById(cid);
      if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      res.json(collection);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const getCollectionsByTitle = async (req, res) => {
    try {
      const { name } = req.params;
      const collections = await findCollectionsByTitle(name);
      if (!collections || collections.length === 0) {
        return res.status(404).json({ message: 'Collections not found' });
      }
      res.json(collections);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const getCollectionsByUserName = async (req, res) => {
    try {
      const { name } = req.params;
      const collections = await findCollectionsByUserName(name);
      if (!collections || collections.length === 0) {
        return res.status(404).json({ message: 'Collections not found' });
      }
      res.json(collections);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const createNewCollection = async (req, res) => {
    try {
      const newCollection = await createCollection(req.body);
      res.status(201).json(newCollection);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  const updateExistingCollection = async (req, res) => {
    try {
      const { cid } = req.params;
      const updatedCollection = await updateCollection(cid, req.body);
      if (!updatedCollection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      res.status(200).json(updatedCollection);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteExistingCollection = async (req, res) => {
    try {
      const { cid } = req.params;
      const deletedCollection = await deleteCollection(cid);
      if (!deletedCollection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      res.status(200).json({ message: 'Collection deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get('/api/collections/', getAllCollections);
  app.get('/api/collections/:cid', getCollectionById);
  app.get('/api/collections/:title', getCollectionsByTitle);
  app.get('/api/collections/:name', getCollectionsByUserName);
  app.post('/api/collections/', createNewCollection);
  app.put('/api/collections/:cid', updateExistingCollection);
  app.delete('/api/collections/:cid', deleteExistingCollection);
}
