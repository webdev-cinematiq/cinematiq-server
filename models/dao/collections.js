// import Collection from '../collections';
import db from '../../database/index.js';

const collections = db.collections;
const users = db.users;
const movies = db.movies;

/* Array Methods */
const findById = (array, id) => array.find((item) => item._id === id);

export const findAllCollections = async () => {
  return collections.map((collection) => ({
    ...collection,
    author: collection.author.map((authorId) => findById(users, authorId)),
    movies: collection.movies.map((movieId) => findById(movies, movieId)),
  }));
};

export const findCollectionById = async (id) => {
  const collection = findById(collections, id);
  if (collection) {
    return {
      ...collection,
      author: collection.author.map((authorId) => findById(users, authorId)),
      movies: collection.movies.map((movieId) => findById(movies, movieId)),
    };
  }
  return null;
};

export const findCollectionsByTitle = async (title) => {
  return collections
    .filter((collection) => collection.title === title)
    .map((collection) => ({
      ...collection,
      author: collection.author.map((authorId) => findById(users, authorId)),
      movies: collection.movies.map((movieId) => findById(movies, movieId)),
    }));
};

export const findCollectionsByUserName = async (username) => {
  const user = users.find((user) => user.name === username);
  if (!user) {
    throw new Error('User not found');
  }
  return collections
    .filter((collection) => collection.author.includes(user._id))
    .map((collection) => ({
      ...collection,
      author: collection.author.map((authorId) => findById(users, authorId)),
      movies: collection.movies.map((movieId) => findById(movies, movieId)),
    }));
};

export const createCollection = async (collectionData) => {
  const newCollection = {
    _id: `collection${collections.length + 1}`,
    ...collectionData,
  };
  collections.push(newCollection);
  return newCollection;
};

export const updateCollection = async (id, collectionData) => {
  const collectionIndex = collections.findIndex(
    (collection) => collection._id === id
  );
  if (collectionIndex === -1) {
    throw new Error('Collection not found');
  }
  collections[collectionIndex] = {
    ...collections[collectionIndex],
    ...collectionData,
  };
  return collections[collectionIndex];
};

export const deleteCollection = async (id) => {
  const collectionIndex = collections.findIndex(
    (collection) => collection._id === id
  );
  if (collectionIndex === -1) {
    throw new Error('Collection not found');
  }
  const deletedCollection = collections.splice(collectionIndex, 1);
  return deletedCollection[0];
};

/* Database Methods */

// export const findAllCollections = async () => {
//   return await Collection.find().populate('author movies');
// };

// export const findCollectionById = async (id) => {
//   return await Collection.findById(id).populate('author movies');
// };

// export const findCollectionByTitle = async (title) => {
//   return await Collection.find({ title }).populate('author movies');
// };

// export const findCollectionsByUserName = async (username) => {
//   return await Collection.find({ 'author.name': username }).populate(
//     'author movies'
//   );
// };

// export const createCollection = async (collectionData) => {
//   const collection = new Collection(collectionData);
//   return await collection.save();
// };

// export const updateCollection = async (id, collectionData) => {
//   return await Collection.findByIdAndUpdate(id, collectionData, { new: true });
// };

// export const deleteCollection = async (id) => {
//   return await Collection.findByIdAndDelete(id);
// };
