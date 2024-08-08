import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: true },
    author: { type: String, required: true },
    text: { type: String, required: true },
    created: { type: Date, required: true },
  },
  { collection: 'comments' }
);

export default commentSchema;
