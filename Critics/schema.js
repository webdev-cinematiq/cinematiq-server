import mongoose from 'mongoose';

const criticSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { collection: 'critics' }
);

export default criticSchema;
