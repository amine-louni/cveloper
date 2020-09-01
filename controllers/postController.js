const Post = require('../models/Post');
const handlerFactory = require('../utils/handlerFactory');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/AppError');

exports.getAllPosts = handlerFactory.getAll(Post, {
  path: 'user',
  select: 'name avatar',
});
exports.getOnePost = handlerFactory.getOne(Post, {
  path: 'user',
  select: 'name avatar',
});
exports.createPost = handlerFactory.createOne(Post, true);
exports.updatePost = handlerFactory.updateOne(Post);
exports.deletePost = handlerFactory.deleteOne(Post);
