import Comment from '../../models/comments';
import Discussion from '../../models/discussions';

export default function CommentRoutes(app) {
  app.put('/api/comments/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      await Comment.updateOne({ _id: cid }, req.body);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.delete('/api/comments/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      await Comment.deleteOne({ _id: cid });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/discussions/:did/comments', async (req, res) => {
    try {
      const { did } = req.params;
      const { author, text } = req.body;
      const newComment = await Comment.create({
        postType: 'COMMENT',
        author,
        text,
        created: new Date(),
      });
      const updatedDiscussion = await Discussion.findOneAndUpdate(
        { _id: did },
        { $push: { comments: { $each: [newComment._id], $position: 0 } } },
        { new: true }
      );
      res.json(updatedDiscussion);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/users/:name/comments', async (req, res) => {
    try {
      const { name } = req.params;
      const comments = await Comment.find({ author: name });
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
}
