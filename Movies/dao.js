import model from './model.js';

export const findAllMovies = () => model.find();

export const findMovieById = async (id) => model.findById(id);

export const findMovieByPartialTitle = (partialTitle) => {
  const regex = new RegExp(partialTitle, 'i');
  return model.find({
    $or: [{ title: { $regex: regex } }],
  });
};

export const findMovie = (id) => model.findOne({ id });

export const findMoviesByTitle = (title) => model.findOne({ title });
