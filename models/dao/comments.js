// import Comment from '../comments';
import db from '../../database/index.js';

const comments = db.comments;
const users = db.users;


/* Array Methods */

const findById = (array, id) => array.find(item => item._id === id);

export const findAllComments = async () => {
  return comments.map(comment => ({
    ...comment,
    author: comment.author.map(authorId => findById(users, authorId))
  }));
};

export const findCommentById = async (id) => {
  const comment = findById(comments, id);
  if (comment) {
    return {
      ...comment,
      author: comment.author.map(authorId => findById(users, authorId))
    };
  }
  return null;
};

export const findCommentByDiscussion = async (discussionId) => {
  return comments
    .filter(comment => comment.discussion === discussionId)
    .map(comment => ({
      ...comment,
      author: comment.author.map(authorId => findById(users, authorId))
    }));
};

export const createComment = async (commentData) => {
  const newComment = { _id: `comment${comments.length + 1}`, ...commentData };
  comments.push(newComment);
  return newComment;
};

export const updateComment = async (id, commentData) => {
  const commentIndex = comments.findIndex(comment => comment._id === id);
  if (commentIndex === -1) {
    throw new Error('Comment not found');
  }
  comments[commentIndex] = { ...comments[commentIndex], ...commentData };
  return comments[commentIndex];
};

export const deleteComment = async (id) => {
  const commentIndex = comments.findIndex(comment => comment._id === id);
  if (commentIndex === -1) {
    throw new Error('Comment not found');
  }
  const deletedComment = comments.splice(commentIndex, 1);
  return deletedComment[0];
};



/* Database Methods */

// export const findAllComments = async () => {
//   return await Comment.find().populate('author');
// };

// export const findCommentById = async (id) => {
//   return await Comment.findById(id).populate('author');
// };

// export const findCommentByDiscussion = async (discussionId) => {
//   return await Comment.find({ discussion: discussionId }).populate('author');
// };

// export const createComment = async (commentData) => {
//   const comment = new Comment(commentData);
//   return await comment.save();
// };

// export const updateComment = async (id, commentData) => {
//   return await Comment.findByIdAndUpdate(id, commentData, { new: true });
// };

// export const deleteComment = async (id) => {
//   return await Comment.findByIdAndDelete(id);
// };
