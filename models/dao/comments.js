import Comment from '../comments';

export const findAllComments = async () => {
  return await Comment.find().populate('author');
};

export const findCommentById = async (id) => {
  return await Comment.findById(id).populate('author');
};

export const findCommentByDiscussion = async (discussionId) => {
  return await Comment.find({ discussion: discussionId }).populate('author');
};

export const createComment = async (commentData) => {
  const comment = new Comment(commentData);
  return await comment.save();
};

export const updateComment = async (id, commentData) => {
  return await Comment.findByIdAndUpdate(id, commentData, { new: true });
};

export const deleteComment = async (id) => {
  return await Comment.findByIdAndDelete(id);
};
