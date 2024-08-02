import mongoose from 'mongoose';
import schema from './schema.js';
const model = mongoose.model('Collection', schema);
export default model;
