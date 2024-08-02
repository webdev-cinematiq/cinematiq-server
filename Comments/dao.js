import model from './model.js';

export const createComment = async (comment) => {
  delete comment._id;
  return await model.create(comment);
};

export const findAllComments = () => model.find();

export const findCommentsByAuthor = (author) => model.findOne({ author });

export const updateComment = (id, commentData) =>
  model.updateOne({ _id: id }, { $set: commentData });

export const deleteComment = async (id) => model.deleteOne({ _id: id });
