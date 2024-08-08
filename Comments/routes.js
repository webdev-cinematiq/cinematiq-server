import * as dao from './dao.js';

export default function CommentRoutes(app) {
  const createComment = async (req, res) => {
    console.log(req.body)
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
      const comments = await dao.findCommentsByAuthor(author);
      res.json(comments);
      return;
    }

    const comments = await dao.findAllComments();
    res.json(comments);
  };

  const findCommentsByReview = async (req, res) => {
    console.log(req.params)
    const { reviewId } = req.params;
    const comments = await dao.findCommentsByReview(reviewId);
    console.log(comments)
    res.json(comments);
  };

  app.post('/api/:author/comments', createComment);
  app.get('/api/comments', findAllComments);
  app.get('/api/comments/review/:reviewId', findCommentsByReview);
  app.put('/api/:author/comments/:commentId', updateComment);
  app.delete('/api/:author/comments/:commentId', deleteComment);
}
