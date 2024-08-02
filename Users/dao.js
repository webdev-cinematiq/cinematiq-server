import model from './model.js';

export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};

export const findAllUsers = () =>
  model
    .find()
    .populate({
      path: 'collections',
      populate: { path: 'movies', populate: { path: 'genres' } },
    })
    .populate({
      path: 'favorites',
      populate: { path: 'genres' },
    });

export const findUserById = (userId) =>
  model
    .findById(userId)
    .populate({
      path: 'collections',
      populate: { path: 'movies', populate: { path: 'genres' } },
    })
    .populate({
      path: 'favorites',
      populate: { path: 'genres' },
    });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, 'i');
  return model
    .find({
      $or: [{ name: { $regex: regex } }],
    })
    .populate({
      path: 'collections',
      populate: { path: 'movies', populate: { path: 'genres' } },
    })
    .populate({
      path: 'favorites',
      populate: { path: 'genres' },
    });
};

export const findUserByName = (name) =>
  model
    .findOne({ name: name })
    .populate({
      path: 'collections',
      populate: { path: 'movies', populate: { path: 'genres' } },
    })
    .populate({
      path: 'favorites',
      populate: { path: 'genres' },
    });

export const findUsersByRole = (role) =>
  model
    .find({ role: role })
    .populate({
      path: 'collections',
      populate: { path: 'movies', populate: { path: 'genres' } },
    })
    .populate({
      path: 'favorites',
      populate: { path: 'genres' },
    });

export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });

export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });
