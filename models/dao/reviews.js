// import Review from '../reviews';
// import User from '../users';
import db from '../../database/index.js';

const reviews = db.reviews;
const movies = db.movies;
const users = db.users;

/* Array Methods */

const findById = (array, id) => array.find((item) => item._id === id);

export const findAllReviews = async () => {
  return reviews.map((review) => ({
    ...review,
    author: review.author.map((authorId) => findById(users, authorId)),
    movie: review.movie.map((movieId) => findById(movies, movieId)),
  }));
};

export const findReviewById = async (id) => {
  const review = findById(reviews, id);
  if (review) {
    return {
      ...review,
      author: review.author.map((authorId) => findById(users, authorId)),
      movie: review.movie.map((movieId) => findById(movies, movieId)),
    };
  }
  return null;
};

export const findReviewsByUsername = async (name) => {
  const user = users.find((user) => user.name === name);
  if (!user) {
    throw new Error('User not found');
  }
  return reviews
    .filter((review) => review.author.includes(user._id))
    .map((review) => ({
      ...review,
      author: review.author.map((authorId) => findById(users, authorId)),
      movie: review.movie.map((movieId) => findById(movies, movieId)),
    }));
};

export const createReview = async (reviewData) => {
  const newReview = { _id: `review${reviews.length + 1}`, ...reviewData };
  reviews.push(newReview);
  return newReview;
};

export const updateReview = async (id, reviewData) => {
  const reviewIndex = reviews.findIndex((review) => review._id === id);
  if (reviewIndex === -1) {
    throw new Error('Review not found');
  }
  reviews[reviewIndex] = { ...reviews[reviewIndex], ...reviewData };
  const updatedReview = reviews[reviewIndex];
  return {
    ...updatedReview,
    author: updatedReview.author.map((authorId) => findById(users, authorId)),
    movie: updatedReview.movie.map((movieId) => findById(movies, movieId)),
  };
};

export const deleteReview = async (id) => {
  const reviewIndex = reviews.findIndex((review) => review._id === id);
  if (reviewIndex === -1) {
    throw new Error('Review not found');
  }
  const deletedReview = reviews.splice(reviewIndex, 1);
  return deletedReview[0];
};

/* Database Methods */

// export const findAllReviews = async () => {
//   return await Review.find().populate('author movie');
// };

// export const findReviewById = async (id) => {
//   return await Review.findById(id).populate('author movie');
// };

// export const findReviewsByUsername = async (name) => {
//   const user = await User.findOne({ name });
//   if (!user) {
//     throw new Error('User not found');
//   }
//   return await Review.find({ author: user._id }).populate('author movie');
// };

// export const createReview = async (reviewData) => {
//   const review = new Review(reviewData);
//   return await review.save();
// };

// export const updateReview = async (id, reviewData) => {
//   return await Review.findByIdAndUpdate(id, reviewData, { new: true });
// };

// export const deleteReview = async (id) => {
//   return await Review.findByIdAndDelete(id);
// };
