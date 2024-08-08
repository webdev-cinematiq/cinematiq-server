import mongoose from 'mongoose';
import schema from './schema.js';
const model = mongoose.model('Admin', schema);
export default model;