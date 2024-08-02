import mongoose from 'mongoose';
import schema from './schema.js';
const model = mongoose.model('Genre', schema);
export default model;
