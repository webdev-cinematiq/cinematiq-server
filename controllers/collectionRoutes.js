import Collection from '../models/collections';

export default function CollectionRoutes(app) {
  app.put('/api/collections/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      await Collection.updateOne({ _id: cid }, req.body);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.delete('/api/collections/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      await Collection.deleteOne({ _id: cid });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/users/:name/collections', async (req, res) => {
    try {
      const { name } = req.params;
      const newCollection = new Collection({
        ...req.body,
        author: name,
      });
      await newCollection.save();
      res.json(newCollection);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/users/:name/collections', async (req, res) => {
    try {
      const { name } = req.params;
      const collections = await Collection.find({ author: name });
      res.json(collections);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
}
