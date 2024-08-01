import mongoose from 'mongoose';

const collectionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    title_id: { type: String, required: true },
    author: { type: String, required: true },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel' }],
    description: { type: String },
    created: { type: Date, required: true },
  },
  { collection: 'collections' }
);
export default collectionSchema;
