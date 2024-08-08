import * as dao from './dao.js';

export default function AdminRoutes(app) {
  const createAdmin = async (req, res) => {
    try {
      const admin = await dao.createAdmin(req.body);
      res.json(admin);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const deleteAdmin = async (req, res) => {
    try {
      const status = await dao.deleteAdmin(req.params.adminId);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const findAllAdmins = async (req, res) => {
    try {
      const admins = await dao.findAllAdmins();
      res.json(admins);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const findAdminByUserId = async (req, res) => {
    const admin = await dao.findAdminByUserId(req.params.userId);
    res.json(admin);
  };

  const updateAdmin = async (req, res) => {
    try {
      const { adminId } = req.params;
      const status = await dao.updateAdmin(adminId, req.body);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const addAdminAction = async (req, res) => {
    try {
      const { adminId } = req.params;
      const status = await dao.addAdminAction(adminId, req.body);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const findAdminsByPermission = async (req, res) => {
    try {
      const { permission } = req.params;
      const admins = await dao.findAdminsByPermission(permission);
      res.json(admins);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const addPermissionToAdmin = async (req, res) => {
    try {
      const { adminId } = req.params;
      const { permission } = req.body;
      const status = await dao.addPermissionToAdmin(adminId, permission);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const removePermissionFromAdmin = async (req, res) => {
    try {
      const { adminId, permission } = req.params;
      const status = await dao.removePermissionFromAdmin(adminId, permission);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  app.post('/api/admins', createAdmin);
  app.get('/api/admins', findAllAdmins);
  app.get('/api/admins/:userId', findAdminByUserId);
  app.put('/api/admins/:adminId', updateAdmin);
  app.delete('/api/admins/:adminId', deleteAdmin);
  app.post('/api/admins/:adminId/actions', addAdminAction);
  app.get('/api/admins/permission/:permission', findAdminsByPermission);
  app.post('/api/admins/:adminId/permissions', addPermissionToAdmin);
  app.delete('/api/admins/:adminId/permissions/:permission', removePermissionFromAdmin);
}