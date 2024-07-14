import Collection from '../models/schema/collection';

export const findAllCollections = async () => {
  return await Collection.find().populate('author movies');
};

export const findCollectionById = async (id) => {
  return await Collection.findById(id).populate('author movies');
};

export const findCollectionByTitle = async (title) => {
  return await Collection.find({ title }).populate('author movies');
};

export const findCollectionsByUserName = async (userName) => {
  return await Collection.find({ 'author.name': userName }).populate(
    'author movies'
  );
};

export const createCollection = async (collectionData) => {
  const collection = new Collection(collectionData);
  return await collection.save();
};

export const updateCollection = async (id, collectionData) => {
  return await Collection.findByIdAndUpdate(id, collectionData, { new: true });
};

export const deleteCollection = async (id) => {
  return await Collection.findByIdAndDelete(id);
};
