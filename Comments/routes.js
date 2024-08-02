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

  const findAllComments = async (req, res) => {
    const { author } = req.query;

    if (author) {
      const collections = await dao.findCommentsByAuthor(author);
      res.json(collections);
      return;
    }

    const collections = await dao.findAllComments();
    res.json(collections);
  };

  app.post('/api/:author/comments', createComment);
  app.get('/api/comments', findAllComments);
  app.put('/api/:author/comments/:commentId', updateComment);
  app.delete('/api/:author/comments/:commentId', deleteComment);
}
