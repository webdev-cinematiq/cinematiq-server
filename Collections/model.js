import mongoose from 'mongoose';
import schema from './schema.js';
const model = mongoose.model('CollectionModel', schema);
export default model;
