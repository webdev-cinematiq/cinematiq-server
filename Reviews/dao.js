import model from './model.js';

export const createReview = async (review) => {
  delete review._id;
  return await model.create(review);
};

export const findAllReviews = () =>
  model.find().populate({
    path: 'comments',
    populate: { path: 'movies', populate: { path: 'genres' } },
  });

export const findReviewById = async (id) =>
  model.findById(id).populate({
    path: 'comments',
    populate: { path: 'movies', populate: { path: 'genres' } },
  });

export const findReviewByPartialText = (partialText) => {
  const regex = new RegExp(partialText, 'i');
  return model
    .find({
      $or: [{ text: { $regex: regex } }],
    })
    .populate({
      path: 'comments',
      populate: { path: 'movies', populate: { path: 'genres' } },
    });
};

export const findReviewsByText = (text) =>
  model.findOne({ text }).populate({
    path: 'comments',
    populate: { path: 'movies', populate: { path: 'genres' } },
  });

export const findReviewsByAuthor = (author) =>
  model.findOne({ author }).populate({
    path: 'comments',
    populate: { path: 'movies', populate: { path: 'genres' } },
  });

export const findReview = (author, title_id) =>
  model.findOne({ author: author, title_id: title_id }).populate({
    path: 'comments',
    populate: { path: 'movies', populate: { path: 'genres' } },
  });

export const updateReview = (id, reviewData) =>
  model.updateOne({ _id: id }, { $set: reviewData });

export const deleteReview = async (id) => model.deleteOne({ _id: id });
