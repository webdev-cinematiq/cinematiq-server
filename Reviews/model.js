import mongoose from 'mongoose';
import schema from './schema.js';
const model = mongoose.model('Review', schema);
export default model;
