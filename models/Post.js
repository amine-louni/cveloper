const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'post must belong to a user'],
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
// populate user/likes users/comments users  on pre find

const Post = mongoose.model('Post', postsSchema);

module.exports = Post;
