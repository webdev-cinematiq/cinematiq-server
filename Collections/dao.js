import model from './model.js';

export const createCollection = (collection) => {
  delete collection._id;
  return model.create(collection);
};

export const findAllCollections = () =>
  model.find().populate({
    path: 'movies',
    populate: { path: 'genres' },
  });

export const findCollectionById = (id) =>
  model.findById(id).populate({
    path: 'movies',
    populate: { path: 'genres' },
  });

export const findCollectionByPartialTitle = (partialTitle) => {
  const regex = new RegExp(partialTitle, 'i');
  return model
    .find({
      $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
    })
    .populate({
      path: 'movies',
      populate: { path: 'genres' },
    });
};

export const findCollectionsByTitle = (title) =>
  model.findOne({ title }).populate({
    path: 'movies',
    populate: { path: 'genres' },
  });

export const findCollectionsByAuthor = (author) =>
  model.find({ author }).populate({
    path: 'movies',
    populate: { path: 'genres' },
  });

export const findCollection = (author, title_id) =>
  model.findOne({ author: author, title_id: title_id }).populate({
    path: 'movies',
    populate: { path: 'genres' },
  });

export const updateCollection = (id, collectionData) =>
  model.updateOne({ _id: id }, { $set: collectionData });

export const deleteCollection = (id) => model.deleteOne({ _id: id });
