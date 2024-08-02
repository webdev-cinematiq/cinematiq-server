import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    author: { type: String, required: true },
    text: { type: String, required: true },
    created: { type: Date, required: true },
  },
  { collection: 'comments' }
);

export default commentSchema;
