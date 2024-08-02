import model from './model.js';

export const findAllMovies = () => model.find().populate('genres');

export const findMovieById = async (id) =>
  model.findById(id).populate('genres');

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
