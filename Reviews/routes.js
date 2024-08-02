import * as dao from './dao.js';

export default function ReviewRoutes(app) {
  const createReview = async (req, res) => {
    const review = await dao.createReview(req.body);
    res.json(review);
  };

  const deleteReview = async (req, res) => {
    const status = await dao.deleteReview(req.params.reviewId);
    res.json(status);
  };

  const findAllReviews = async (req, res) => {
    const { text } = req.query;

    if (text) {
      const reviews = await dao.findReviewByPartialText(text);
      res.json(reviews);
      return;
    }

    const reviews = await dao.findAllReviews();
    res.json(reviews);
  };

  const findReview = async (req, res) => {
    const { author, textId } = req.params;
    const review = await dao.findReview(author, textId);
    res.json(review);
  };

  const findReviewById = async (req, res) => {
    const review = await dao.findReviewById(req.params.reviewId);
    res.json(review);
  };

  const findReviewsByText = async (req, res) => {
    const review = await dao.findReviewsByText(req.params.title);
    res.json(review);
  };

  const findReviewsByAuthor = async (req, res) => {
    const review = await dao.findReviewsByAuthor(req.params.author);
    res.json(review);
  };

  const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const status = await dao.updateReview(reviewId, req.body);
    res.json(status);
  };

  app.post('/api/:author/reviews', createReview);
  app.get('/api/reviews', findAllReviews);
  app.get('/api/reviews/:title', findReviewsByText);
  app.get('/api/:name/reviews', findReviewsByAuthor);
  app.get('/api/:name/reviews/:rid', findReviewById);
  app.get('/api/:author/reviews/:titleId', findReview);
  app.put('/api/:author/reviews/:reviewId', updateReview);
  app.delete('/api/:author/reviews/:reviewId', deleteReview);
}
