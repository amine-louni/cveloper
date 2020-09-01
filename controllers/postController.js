const Post = require('../models/Post');
const AppError = require('../utils/AppError');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.updateMyPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('No document found with that ID', 404));

  if (!post.user.equals(req.currentUser._id)) {
    return next(
      new AppError(
        "You don't have the permission to perform the action with this item",
        403
      )
    );
  }

  post.text = req.body.text;
  const updatedPost = await post.save();

  res.status(201).json({
    status: 'success',
    doc: updatedPost,
  });
});

exports.deleteMyPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return next(new AppError('No document found with that ID', 404));

  if (!post.user.equals(req.currentUser._id)) {
    return next(
      new AppError(
        "You don't have the permission to perform the action with this item",
        403
      )
    );
  }

  await Post.findByIdAndRemove(req.params.id);

  res.status(204).json({
    status: 'success',
  });
});

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
