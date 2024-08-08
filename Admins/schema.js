import mongoose from 'mongoose';

const adminActionSchema = new mongoose.Schema({
  actionType: {
    type: String,
    required: true,
    enum: ['DELETE_USER', 'DELETE_CONTENT', 'UPDATE_USER_ROLE', 'UPDATE_USER_REPUTATION']
  },
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  targetContent: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'contentModel'
  },
  contentModel: {
    type: String,
    enum: ['MOVIE', 'REVIEW', 'CONTENT']
  },
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const adminSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    permissions: [{ type: String, enum: ['MANAGE_USERS', 'MANAGE_CONTENT'] }],
    actions: [adminActionSchema]
  },
  { collection: 'admins', timestamps: true }
);

export default adminSchema;
