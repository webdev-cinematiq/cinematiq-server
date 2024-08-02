import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    role: { type: String, required: true, enum: ['VIEWER', 'CRITIC', 'ADMIN'] },
    avatar: { type: String },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reputation: { type: Number, default: 0 },
    join_date: { type: Date, required: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  },
  { collection: 'users' }
);

export default userSchema;
