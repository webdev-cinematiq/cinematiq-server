// import Discussion from '../discussions';
import db from '../../database/index.js';

const discussions = db.discussions;
const movies = db.movies;
const comments = db.comments;
const users = db.users;

/* Array Methods */

const findById = (array, id) => array.find(item => item._id === id);

export const findAllDiscussions = async () => {
  return discussions.map(discussion => ({
    ...discussion,
    movie: discussion.movie.map(movieId => findById(movies, movieId)),
    author: discussion.author.map(authorId => findById(users, authorId)),
    comments: discussion.comments.map(commentId => findById(comments, commentId))
  }));
};

export const findDiscussionById = async (id) => {
  const discussion = findById(discussions, id);
  if (discussion) {
    return {
      ...discussion,
      movie: discussion.movie.map(movieId => findById(movies, movieId)),
      author: discussion.author.map(authorId => findById(users, authorId)),
      comments: discussion.comments.map(commentId => findById(comments, commentId))
    };
  }
  return null;
};

export const createDiscussion = async (discussionData) => {
  const newDiscussion = { _id: `discussion${discussions.length + 1}`, ...discussionData };
  discussions.push(newDiscussion);
  return newDiscussion;
};

export const addCommentToDiscussion = async (discussionId, commentId) => {
  const discussion = findById(discussions, discussionId);
  if (!discussion) {
    throw new Error('Discussion not found');
  }
  discussion.comments.unshift(commentId);
  return {
    ...discussion,
    movie: discussion.movie.map(movieId => findById(movies, movieId)),
    author: discussion.author.map(authorId => findById(users, authorId)),
    comments: discussion.comments.map(commentId => findById(comments, commentId))
  };
};

export const removeCommentFromDiscussion = async (discussionId, commentId) => {
  const discussion = findById(discussions, discussionId);
  if (!discussion) {
    throw new Error('Discussion not found');
  }
  discussion.comments = discussion.comments.filter(id => id !== commentId);
  return {
    ...discussion,
    movie: discussion.movie.map(movieId => findById(movies, movieId)),
    author: discussion.author.map(authorId => findById(users, authorId)),
    comments: discussion.comments.map(commentId => findById(comments, commentId))
  };
};

export const updateDiscussion = async (id, discussionData) => {
  const discussionIndex = discussions.findIndex(discussion => discussion._id === id);
  if (discussionIndex === -1) {
    throw new Error('Discussion not found');
  }
  discussions[discussionIndex] = { ...discussions[discussionIndex], ...discussionData };
  const updatedDiscussion = discussions[discussionIndex];
  return {
    ...updatedDiscussion,
    movie: updatedDiscussion.movie.map(movieId => findById(movies, movieId)),
    author: updatedDiscussion.author.map(authorId => findById(users, authorId)),
    comments: updatedDiscussion.comments.map(commentId => findById(comments, commentId))
  };
};

export const deleteDiscussion = async (id) => {
  const discussionIndex = discussions.findIndex(discussion => discussion._id === id);
  if (discussionIndex === -1) {
    throw new Error('Discussion not found');
  }
  const deletedDiscussion = discussions.splice(discussionIndex, 1);
  return deletedDiscussion[0];
};



/* Database Methods */

// export const findAllDiscussions = async () => {
//   return await Discussion.find().populate('movie author comments');
// };

// export const findDiscussionById = async (id) => {
//   return await Discussion.findById(id).populate('movie author comments');
// };

// export const createDiscussion = async (discussionData) => {
//   const discussion = new Discussion(discussionData);
//   return await discussion.save();
// };

// export const addCommentToDiscussion = async (discussionId, commentId) => {
//   return await Discussion.findOneAndUpdate(
//     { _id: discussionId },
//     { $push: { comments: { $each: [commentId], $position: 0 } } },
//     { new: true }
//   );
// };

// export const removeCommentFromDiscussion = async (discussionId, commentId) => {
//   return await Discussion.findOneAndUpdate(
//     { _id: discussionId },
//     { $pull: { comments: commentId } },
//     { new: true }
//   );
// };

// export const updateDiscussion = async (id, discussionData) => {
//   return await Discussion.findByIdAndUpdate(id, discussionData, { new: true });
// };

// export const deleteDiscussion = async (id) => {
//   return await Discussion.findByIdAndDelete(id);
// };
