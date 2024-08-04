import model from './model.js';

export const findAllGenres = () => model.find();

export const findGenreById = async (id) =>
  model.findById(id);

export const findGenreByPartialName = (partialName) => {
  const regex = new RegExp(partialName, 'i');
  return model
    .find({
      $or: [{ name: { $regex: regex } }],
    })
};

export const findGenre = (value) => model.findOne({ value });

export const findGenresByName = (name) =>
  model.findOne({ name });

export const updateGenres = (id, genreData) =>
  model.updateOne({ id: id }, { $set: genreData }, { $upsert: true });
