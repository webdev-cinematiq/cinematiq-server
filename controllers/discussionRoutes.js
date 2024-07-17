import {
  findAllDiscussions,
  findDiscussionById,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
} from '../models/dao/discussions.js';

export default function DiscussionRoutes(app) {
  const getAllDiscussions = async (req, res) => {
    try {
      const discussions = await findAllDiscussions();
      res.json(discussions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const getDiscussionById = async (req, res) => {
    try {
      const { did } = req.params;
      const discussion = await findDiscussionById(did);
      if (!discussion) {
        return res.status(404).json({ message: 'Discussion not found' });
      }
      res.json(discussion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const createNewDiscussion = async (req, res) => {
    try {
      const newDiscussion = await createDiscussion(req.body);
      res.status(201).json(newDiscussion);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  const updateExistingDiscussion = async (req, res) => {
    try {
      const { did } = req.params;
      const updatedDiscussion = await updateDiscussion(did, req.body);
      if (!updatedDiscussion) {
        return res.status(404).json({ message: 'Discussion not found' });
      }
      res.status(200).json(updatedDiscussion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteExistingDiscussion = async (req, res) => {
    try {
      const { did } = req.params;
      const deletedDiscussion = await deleteDiscussion(did);
      if (!deletedDiscussion) {
        return res.status(404).json({ message: 'Discussion not found' });
      }
      res.status(200).json({ message: 'Discussion deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  // Define routes
  app.get('/api/discussions', getAllDiscussions);
  app.get('/api/discussions/:did', getDiscussionById);
  app.post('/api/discussions', createNewDiscussion);
  app.put('/api/discussions/:did', updateExistingDiscussion);
  app.delete('/api/discussions/:did', deleteExistingDiscussion);
}
