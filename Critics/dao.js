import model from './model.js';

export const createCritic = (critic) => {
  delete critic._id;
  return model.create(critic);
};

export const findAllCritics = () =>
  model
    .find()
    .populate('user')
    .populate({
      path: 'reviews',
      populate: { path: 'movie genres' },
    })
    .populate('comments');

export const updateCritic = (criticId, critic) =>
  model.updateOne({ _id: criticId }, { $set: critic });

export const deleteCritic = (criticId) => model.deleteOne({ _id: criticId });
