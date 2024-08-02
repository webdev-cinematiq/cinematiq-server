import mongoose from 'mongoose';

const criticSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { collection: 'critic' }
);

export default userSchema;
