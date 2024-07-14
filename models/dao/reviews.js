import Review from '../reviews';

export const findAllReviews = async () => {
  return await Review.find().populate('author movie');
};

export const findReviewById = async (id) => {
  return await Review.findById(id).populate('author movie');
};

export const createReview = async (reviewData) => {
  const review = new Review(reviewData);
  return await review.save();
};

export const updateReview = async (id, reviewData) => {
  return await Review.findByIdAndUpdate(id, reviewData, { new: true });
};

export const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};
