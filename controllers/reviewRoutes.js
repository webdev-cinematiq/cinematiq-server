import {
  findAllReviews,
  findReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../models/dao/reviews';

export default function ReviewRoutes(app) {
  const getAllReviews = async (req, res) => {
    try {
      const reviews = await findAllReviews();
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const getReviewById = async (req, res) => {
    try {
      const { rid } = req.params;
      const review = await findReviewById(rid);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const createNewReview = async (req, res) => {
    try {
      const newReview = await createReview(req.body);
      res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  const updateExistingReview = async (req, res) => {
    try {
      const { rid } = req.params;
      const updatedReview = await updateReview(rid, req.body);
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.status(200).json(updatedReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteExistingReview = async (req, res) => {
    try {
      const { rid } = req.params;
      const deletedReview = await deleteReview(rid);
      if (!deletedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  // define routes
  app.get('/api/reviews', getAllReviews);
  app.get('/api/reviews/:rid', getReviewById);
  app.post('/api/reviews', createNewReview);
  app.put('/api/reviews/:rid', updateExistingReview);
  app.delete('/api/reviews/:rid', deleteExistingReview);
}
