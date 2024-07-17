// import Profile from '../profiles';
// import user from '../schema/user';
// import User from '../users';
import db from '../../database/index.js';

const profiles = db.profiles;
const movies = db.movies;
const collections = db.collections;
const users = db.users;


/* Array Methods */
const findById = (array, id) => array.find(item => item._id === id);

export const findAllProfiles = async () => {
  return profiles.map(profile => ({
    ...profile,
    user: profile.user.map(userId => findById(users, userId)),
    favorites: profile.favorites.map(movieId => findById(movies, movieId)),
    collections: profile.collections.map(collectionId => findById(collections, collectionId))
  }));
};

export const findProfileById = async (id) => {
  const profile = findById(profiles, id);
  if (profile) {
    return {
      ...profile,
      user: profile.user.map(userId => findById(users, userId)),
      favorites: profile.favorites.map(movieId => findById(movies, movieId)),
      collections: profile.collections.map(collectionId => findById(collections, collectionId))
    };
  }
  return null;
};

export const findProfileByUsername = async (username) => {
  const user = users.find(user => user.name === username);
  if (!user) {
    throw new Error('User not found');
  }
  const profile = profiles.find(profile => profile.user.includes(user._id));
  if (profile) {
    return {
      ...profile,
      user: profile.user.map(userId => findById(users, userId)),
      favorites: profile.favorites.map(movieId => findById(movies, movieId)),
      collections: profile.collections.map(collectionId => findById(collections, collectionId))
    };
  }
  return null;
};

export const createProfile = async (profileData) => {
  const newProfile = { _id: `profile${profiles.length + 1}`, ...profileData };
  profiles.push(newProfile);
  return newProfile;
};

export const addCollectionToProfile = async (username, collectionId) => {
  const user = users.find(user => user.name === username);
  if (!user) {
    throw new Error('User not found');
  }
  const profile = profiles.find(profile => profile.user.includes(user._id));
  if (!profile) {
    throw new Error('Profile not found');
  }
  profile.collections.push(collectionId);
  return {
    ...profile,
    user: profile.user.map(userId => findById(users, userId)),
    favorites: profile.favorites.map(movieId => findById(movies, movieId)),
    collections: profile.collections.map(collectionId => findById(collections, collectionId))
  };
};

export const updateProfile = async (id, profileData) => {
  const profileIndex = profiles.findIndex(profile => profile._id === id);
  if (profileIndex === -1) {
    throw new Error('Profile not found');
  }
  profiles[profileIndex] = { ...profiles[profileIndex], ...profileData };
  const updatedProfile = profiles[profileIndex];
  return {
    ...updatedProfile,
    user: updatedProfile.user.map(userId => findById(users, userId)),
    favorites: updatedProfile.favorites.map(movieId => findById(movies, movieId)),
    collections: updatedProfile.collections.map(collectionId => findById(collections, collectionId))
  };
};

export const deleteProfile = async (id) => {
  const profileIndex = profiles.findIndex(profile => profile._id === id);
  if (profileIndex === -1) {
    throw new Error('Profile not found');
  }
  const deletedProfile = profiles.splice(profileIndex, 1);
  return deletedProfile[0];
};

/* Database Methods */

// export const findAllProfiles = async () => {
//   return await Profile.find().populate('user favorites collections');
// };

// export const findProfileById = async (id) => {
//   return await Profile.findById(id).populate('user favorites collections');
// };

// export const findProfileByUsername = async (username) => {
//   const user = await User.findOne({ name: username });
//   if (!user) {
//     throw new Error('User not found');
//   }
//   return await Profile.findOne({ user: user._id }).populate(
//     'user favorites collections'
//   );
// };

// export const createProfile = async (profileData) => {
//   const profile = new Profile(profileData);
//   return await profile.save();
// };

// export const addCollectionToProfile = async (name, collectionId) => {
//   const user = await User.findOne({ name });
//   if (!user) {
//     throw new Error('User not found');
//   }

//   return await Profile.findOneAndUpdate(
//     { user: user._id },
//     { $push: { collections: collectionId } },
//     { new: true }
//   ).populate('user favorites collections');
// };

// export const updateProfile = async (id, profileData) => {
//   return await Profile.findByIdAndUpdate(id, profileData, { new: true });
// };

// export const deleteProfile = async (id) => {
//   return await Profile.findByIdAndDelete(id);
// };
