import * as dao from './dao.js';

export default function CommentRoutes(app) {
  const createComment = async (req, res) => {
    const comment = await dao.createComment(req.body);
    res.json(comment);
  };

  const deleteComment = async (req, res) => {
    const status = await dao.deleteComment(req.params.commentId);
    res.json(status);
  };

  const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const status = await dao.updateComment(commentId, req.body);
    res.json(status);
  };

  app.post('/api/:author/comments', createComment);
  app.put('/api/:author/comments/:commentId', updateComment);
  app.delete('/api/:author/comments/:commentId', deleteComment);
}
