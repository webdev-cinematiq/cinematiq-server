import model from './model.js';

export const createReview = async (review) => {
  delete review._id;
  return await model.create(review);
};

export const findAllReviews = () =>
  model
    .find()
    .populate({
      path: 'movie',
      populate: { path: 'genres' },
    })
    .populate('comments');

export const findReviewById = async (id) =>
  model
    .findById(id)
    .populate({
      path: 'movie',
      populate: { path: 'genres' },
    })
    .populate('comments');

export const findReviewByPartialText = (partialText) => {
  const regex = new RegExp(partialText, 'i');
  return model
    .find({
      $or: [{ text: { $regex: regex } }],
    })
    .populate({
      path: 'movie',
      populate: { path: 'genres' },
    })
    .populate('comments');
};

export const findReviewsByText = (text) =>
  model
    .findOne({ text })
    .populate({
      path: 'movie',
      populate: { path: 'genres' },
    })
    .populate('comments');

export const findReviewsByAuthor = (author) =>
  model
    .find({ author })
    .populate({
      path: 'movie',
      populate: { path: 'genres' },
    })
    .populate('comments');

export const findReview = (author, title_id) =>
  model
    .findOne({ author: author, title_id: title_id })
    .populate({
      path: 'movie',
      populate: { path: 'genres' },
    })
    .populate('comments');

export const updateReview = (id, reviewData) =>
  model.updateOne({ _id: id }, { $set: reviewData });

export const deleteReview = async (id) => model.deleteOne({ _id: id });
