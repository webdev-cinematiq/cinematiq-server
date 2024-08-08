import mongoose from 'mongoose';

const adminSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    permissions: [{ type: String, enum: ['manage_users', 'manage_content'] }],
  },
  { collection: 'admins', timestamps: true }
);

export default adminSchema;
