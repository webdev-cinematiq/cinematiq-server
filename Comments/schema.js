const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    created: { type: Date, required: true },
  },
  { collection: 'comments' }
);

export default commentSchema;
