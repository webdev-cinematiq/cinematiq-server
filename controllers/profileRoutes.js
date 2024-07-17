import {
  findAllProfiles,
  findProfileById,
  findProfileByUsername,
  createProfile,
  updateProfile,
  deleteProfile,
} from '../models/dao/profiles.js';

export default function ProfileRoutes(app) {
  const getAllProfiles = async (req, res) => {
    try {
      const profiles = await findAllProfiles();
      res.json(profiles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const getProfileById = async (req, res) => {
    try {
      const { pid } = req.params;
      const profile = await findProfileById(pid);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const getProfileByUsername = async (req, res) => {
    try {
      const { name } = req.params;
      const profile = await findProfileByUsername(name);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const createNewProfile = async (req, res) => {
    try {
      const newProfile = await createProfile(req.body);
      res.status(201).json(newProfile);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  const updateExistingProfile = async (req, res) => {
    try {
      const { pid } = req.params;
      const updatedProfile = await updateProfile(pid, req.body);
      if (!updatedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteExistingProfile = async (req, res) => {
    try {
      const { pid } = req.params;
      const deletedProfile = await deleteProfile(pid);
      if (!deletedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(200).json({ message: 'Profile deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get('/api/profiles', getAllProfiles); // probably don't need, no use case
  app.get('/api/profiles/:pid', getProfileById);
  app.get('/api/:name/profile', getProfileByUsername);
  app.post('/api/:name/profile', createNewProfile);
  app.put('/api/profile/:pid', updateExistingProfile);
  app.delete('/api/profile/:pid', deleteExistingProfile);
}
