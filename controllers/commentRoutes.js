import {
  findAllComments,
  findCommentById,
  createComment,
  updateComment,
  deleteComment,
} from '../models/dao/comments';

export default function CommentRoutes(app) {

  const getAllComments = async (req, res) => {
    try {
      const comments = await findAllComments();
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const getCommentById = async (req, res) => {
    try {
      const { cid } = req.params;
      const comment = await findCommentById(cid);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const createNewComment = async (req, res) => {
    try {
      const newComment = await createComment(req.body);
      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  const updateExistingComment = async (req, res) => {
    try {
      const { cid } = req.params;
      const updatedComment = await updateComment(cid, req.body);
      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteExistingComment = async (req, res) => {
    try {
      const { cid } = req.params;
      const deletedComment = await deleteComment(cid);
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  // Define routes
  app.get('/api/comments/', getAllComments);
  app.get('/api/comments/:cid', getCommentById);
  app.post('/api/comments/', createNewComment);
  app.put('/api/comments/:cid', updateExistingComment);
  app.delete('/api/comments/:cid', deleteExistingComment);
}
