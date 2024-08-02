import mongoose from 'mongoose';
import schema from './schema.js';
const model = mongoose.model('Critic', schema);
export default model;
