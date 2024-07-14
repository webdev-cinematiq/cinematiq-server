import {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../models/dao/users';

export default function UserRoutes(app) {
  const getAllUsers = async (req, res) => {
    try {
      const users = await findAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const getUserById = async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await findUserById(uid);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const createNewUser = async (req, res) => {
    try {
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  const updateExistingUser = async (req, res) => {
    try {
      const { uid } = req.params;
      const updatedUser = await updateUser(uid, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteExistingUser = async (req, res) => {
    try {
      const { uid } = req.params;
      const deletedUser = await deleteUser(uid);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  // define routes
  app.get('/api/users', getAllUsers);
  app.get('/api/users/:uid', getUserById);
  app.get('/api/users/:name', getUserByName);
  app.post('/api/users/create', createNewUser);
  app.put('/api/users/:uid', updateExistingUser);
  app.delete('/api/users/:uid', deleteExistingUser);
}
