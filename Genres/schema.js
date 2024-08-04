import mongoose from 'mongoose';

const genreSchema = mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String, required: true },
  },
  { collection: 'genres' }
);
export default genreSchema;
