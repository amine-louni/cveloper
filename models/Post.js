const mongoose = require('mongoose');
const slugify = require('slugify');

const postsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'post must belong to a user'],
    },
    title: {
      type: String,
      required: [true, 'title must not be empty'],
      unique: [true, 'title must not be unique'],
      trim: true,
    },
    slug: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//@TODO
// Get 5 most popular posts

// Doc Middlewares run with  save()  and create()  ( pre for before and post for after )
postsSchema.pre('save', function (next) {
  // 'this' point to the doc instance
  this.slug = slugify(this.title, { lower: true });
  next();
});

// populate user/likes users/comments users  on pre find
postsSchema.pre(/^find/, function (next) {
  // this points to the current query

  this.populate({
    path: 'comments',
    model: 'User',
    select: 'firstName',
  })
    .populate({
      path: 'likes',
      model: 'User',
    })
    .populate({
      path: 'user',
      model: 'User',
      select: '-readingList',
    });

  next();
});

const Post = mongoose.model('Post', postsSchema);

module.exports = Post;
