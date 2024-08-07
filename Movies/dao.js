import model from './model.js';

export const findAndUpdateMovie = (id, movieData) =>
  model.findOneAndUpdate(
    { id: id },
    { $set: movieData },
    { new: true, upsert: true }
  );

export const findAllMovies = () => model.find().populate('genres');

export const findMovieById = (id) => model.findById(id).populate('genres');

export const findMovieByPartialTitle = (partialTitle) => {
  const regex = new RegExp(partialTitle, 'i');
  return model
    .find({
      $or: [{ title: { $regex: regex } }],
    })
    .populate('genres');
};

export const findMovie = (id) => model.findOne({ id }).populate('genres');

export const findMoviesByTitle = (title) =>
  model.findOne({ title }).populate('genres');

export const findAndUpdateMovieCollections = (id, movieData, collectionId) => {
  const updateData = {
    $set: movieData,
  };

  if (collectionId) {
    updateData.$addToSet = { collections: collectionId };
  }

  return model.findOneAndUpdate({ id: id }, updateData, {
    new: true,
    upsert: true,
  });
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

  return model.findOneAndUpdate({ id: id }, updateData, {
    new: true,
    upsert: true,
  });
};
