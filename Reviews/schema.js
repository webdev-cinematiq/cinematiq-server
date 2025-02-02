import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['SHORT', 'LONG'],
      required: true,
      default: 'SHORT',
      immutable: true,
    },
    author: { type: String, required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    rating: { type: Number, required: true, default: 0 },
    text: { type: String },
    text_id: { type: String, required: true },
    watch_date: { type: Date, required: true },
    review_date: { type: Date, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { collection: 'reviews' }
);

export default reviewSchema;
