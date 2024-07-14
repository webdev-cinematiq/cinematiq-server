import Profile from '../profiles';
import User from '../users';

export const findAllProfiles = async () => {
  return await Profile.find().populate('user favorites collections');
};

export const findProfileById = async (id) => {
  return await Profile.findById(id).populate('user favorites collections');
};

export const findProfileByUserId = async (userId) => {
  return await Profile.findOne({ user: userId }).populate(
    'user favorites collections'
  );
};

export const createProfile = async (profileData) => {
  const profile = new Profile(profileData);
  return await profile.save();
};

export const addCollectionToProfile = async (name, collectionId) => {
  const user = await User.findOne({ name });
  if (!user) {
    throw new Error('User not found');
  }

  return await Profile.findOneAndUpdate(
    { user: user._id },
    { $push: { collections: collectionId } },
    { new: true }
  ).populate('user favorites collections');
};

export const updateProfile = async (id, profileData) => {
  return await Profile.findByIdAndUpdate(id, profileData, { new: true });
};

export const deleteProfile = async (id) => {
  return await Profile.findByIdAndDelete(id);
};
