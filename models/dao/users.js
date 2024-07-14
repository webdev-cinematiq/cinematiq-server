import User from '../users';
import bcrypt from 'bcrypt';

export const findAllUsers = async () => {
  return await User.find();
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const findUserByName = async (name) => {
  return await User.findOne({ name });
};

export const findUserByCredentials = async (name, password) => {
  const user = await User.findOne({ name });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
};

export const createUser = async (userData) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  const user = new User({ ...userData, password: hashedPassword, joinDate: new Date() });
  return await user.save();
};

export const updateUser = async (id, userData) => {
  if (userData.password) {
    const saltRounds = 10;
    userData.password = await bcrypt.hash(userData.password, saltRounds);
  }
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
