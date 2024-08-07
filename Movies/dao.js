import model from './model.js';

export const findAndUpdateMovie = (id, movieData) =>
  model
    .findOneAndUpdate(
      { id: id },
      { $set: movieData },
      { new: true, upsert: true }
    )
    .populate('genres')
    .populate('collections')
    .populate('reviews');

export const findAllMovies = () =>
  model.find().populate('genres').populate('collections').populate('reviews');

export const findMovieById = (id) => model.findById(id).populate('genres');

export const findMovieByPartialTitle = (partialTitle) => {
  const regex = new RegExp(partialTitle, 'i');
  return model
    .find({
      $or: [{ title: { $regex: regex } }],
    })
    .populate('genres')
    .populate('collections')
    .populate('reviews');
};

export const findMovie = (id) =>
  model
    .findOne({ id })
    .populate('genres')
    .populate('collections')
    .populate('reviews');

export const findMoviesByTitle = (title) =>
  model
    .findOne({ title })
    .populate('genres')
    .populate('collections')
    .populate('reviews');

export const findAndUpdateMovieCollections = (id, movieData, collectionId) => {
  const updateData = {
    $set: movieData,
    $addToSet: { collections: collectionId },
  };

  return model
    .findOneAndUpdate({ id: id }, updateData, {
      new: true,
      upsert: true,
    })
    .populate('genres')
    .populate('collections')
    .populate('reviews');
};

export const findAndUpdateMovieReviews = (id, movieData, reviewId) => {
  const updateData = {
    $set: movieData,
  };

  if (reviewId) {
    if (!updateData.$addToSet) {
      updateData.$addToSet = {};
    }
    updateData.$addToSet.reviews = reviewId;
  }

  return model
    .findOneAndUpdate({ id: id }, updateData, {
      new: true,
      upsert: true,
    })
    .populate('genres')
    .populate('collections')
    .populate('reviews');
};
