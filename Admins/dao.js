import model from './model.js';

export const createAdmin = (admin) => {
  delete admin._id;
  return model.create(admin);
};

export const findAllAdmins = () =>
  model
    .find()
    .populate('user')
    .populate({
      path: 'actions.targetUser',
      model: 'User'
    });

export const findAdminByUserId = (user) =>
  model.findOne({ user });

export const updateAdmin = (adminId, admin) =>
  model.updateOne({ _id: adminId }, { $set: admin });

export const deleteAdmin = (adminId) => model.deleteOne({ _id: adminId });

export const addAdminAction = (adminId, action) =>
  model.updateOne(
    { _id: adminId },
    { $push: { actions: action } }
  );

export const findAdminsByPermission = (permission) =>
  model.find({ permissions: permission }).populate('user');

export const addPermissionToAdmin = (adminId, permission) =>
  model.updateOne(
    { _id: adminId },
    { $addToSet: { permissions: permission } }
  );

export const removePermissionFromAdmin = (adminId, permission) =>
  model.updateOne(
    { _id: adminId },
    { $pull: { permissions: permission } }
  );

export const findAdminActions = (adminId, limit = 10) =>
  model.findById(adminId)
    .select('actions')
    .slice('actions', -limit)
    .populate({
      path: 'actions.targetUser',
      model: 'User'
    });