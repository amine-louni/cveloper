const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'post must belong to a user'],
  },
  title: {
    type: String,
    required: [true, 'title must not be empty'],
    trim: true,
  },
  cover: {
    type: String,
    required: [true, 'title must not be empty'],
  },
  tags: {
    type: [String],
  },
  text: {
    type: String,
    required: [true, 'post must not be empty'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

      text: {
        type: String,
        required: [true, 'text comment is a required field'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

//@TODO
// Calc likes sum
// Calc comments sum
// Get 5 most popular posts

// populate user/likes users/comments users  on pre find
postsSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.populate({
    path: 'comments',
    populate: {
      path: 'user',
      model: 'User',
      select: 'firstName lastName userName avatar',
    },
  })
    .populate({
      path: 'likes',
      populate: {
        path: 'user',
        model: 'User',
        select: 'firstName lastName userName avatar',
      },
    })
    .populate({
      path: 'user',
      populate: {
        path: 'user',
        model: 'User',
        select: ['firstName', 'lastName', 'userName', 'avatar'],
      },
    });

  next();
});

const Post = mongoose.model('Post', postsSchema);

module.exports = Post;
