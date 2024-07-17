// import User from '../users';
// import bcrypt from 'bcrypt';
import bcrypt from 'bcrypt';
import db from '../../database/index.js';

const users = db.users;

/* Array Methods */

const findById = (array, id) => array.find((item) => item._id === id);

export const findAllUsers = async () => {
  return users;
};

export const findUserById = async (id) => {
  return findById(users, id);
};

export const findUserByName = async (name) => {
  return users.find((user) => user.name === name);
};

export const findUserByCredentials = async (name, password) => {
  const user = users.find((user) => user.name === name);
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
};

export const createUser = async (userData) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  const newUser = {
    _id: `user${users.length + 1}`,
    ...userData,
    password: hashedPassword,
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = async (id, userData) => {
  const userIndex = users.findIndex((user) => user._id === id);
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  if (userData.password) {
    const saltRounds = 10;
    userData.password = await bcrypt.hash(userData.password, saltRounds);
  }
  users[userIndex] = { ...users[userIndex], ...userData };
  return users[userIndex];
};

export const deleteUser = async (id) => {
  const userIndex = users.findIndex((user) => user._id === id);
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  const deletedUser = users.splice(userIndex, 1);
  return deletedUser[0];
};

/* Database Methods */

// export const findAllUsers = async () => {
//   return await User.find();
// };

// export const findUserById = async (id) => {
//   return await User.findById(id);
// };

// export const findUserByName = async (name) => {
//   return await User.findOne({ name });
// };

// export const findUserByCredentials = async (name, password) => {
//   const user = await User.findOne({ name });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     return user;
//   }
//   return null;
// };

// export const createUser = async (userData) => {
//   const saltRounds = 10;
//   const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
//   const user = new User({ ...userData, password: hashedPassword });
//   return await user.save();
// };

// export const updateUser = async (id, userData) => {
//   if (userData.password) {
//     const saltRounds = 10;
//     userData.password = await bcrypt.hash(userData.password, saltRounds);
//   }
//   return await User.findByIdAndUpdate(id, userData, { new: true });
// };

// export const deleteUser = async (id) => {
//   return await User.findByIdAndDelete(id);
// };
