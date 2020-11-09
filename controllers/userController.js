const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Tag = require('../models/Tag');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Post = require('../models/Post');

// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('avatar');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.currentUser._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated

  if (req.file) req.body.avatar = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.currentUser._id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  console.log(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteOneUserAndItsProfile = catchAsync(async (req, res, next) => {
  await Profile.findOneAndRemove({ user: req.currentUser._id });
  await User.findOneAndRemove({ _id: req.currentUser.id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.followUser = catchAsync(async (req, res, next) => {
  // check if user id valid

  const user = await User.findById(req.params.userId);
  if (!user) return next(new AppError('There is not user with this id', 403));
  // check if user id it not already followed

  if (req.currentUser.followingUsers.indexOf(req.params.userId) > 0)
    return next(new AppError('this user already followed', 403));

  // follow !

  await User.findByIdAndUpdate(req.currentUser.id, {
    $push: { followingUsers: req.params.userId },
  });

  res.status(201).json({
    status: 'success',
  });
});

exports.unfollowUser = catchAsync(async (req, res, next) => {
  // check if user id valid

  const user = await User.findById(req.params.userId);
  if (!user) return next(new AppError('There is not user with this id', 403));
  if (user._id === req.currentUser._id)
    return next(new AppError('You can not follow your self', 403));
  // check if user id it not already followed

  if (req.currentUser.followingUsers.indexOf(req.params.userId) < 0)
    return next(new AppError('this user is not followed', 403));

  // unfollow !

  await User.findByIdAndUpdate(req.currentUser.id, {
    $pull: { followingUsers: req.params.userId },
  });

  res.status(201).json({
    status: 'success',
  });
});

exports.followTag = catchAsync(async (req, res, next) => {
  // check if tag id valid
  console.log(req.params.tagId);
  const tag = await Tag.findById(req.params.tagId);
  if (!tag) return next(new AppError('There is not tag with this id', 403));
  // check if user id it not already followed

  if (req.currentUser.followingTags.indexOf(req.params.tagId) > 0)
    return next(new AppError('this tag already followed', 403));

  // follow !

  await User.findByIdAndUpdate(req.currentUser.id, {
    $push: { followingTags: req.params.tagId },
  });

  res.status(201).json({
    status: 'success',
  });
});

exports.unfollowUser = catchAsync(async (req, res, next) => {
  // check if user id valid

  const tag = await Tag.findById(req.params.tagId);
  if (!tag) return next(new AppError('There is not user with this id', 403));
  // check if user id it not already followed

  if (req.currentUser.followingTags.indexOf(req.params.tagId) < 0)
    return next(new AppError('this tag is not followed', 403));

  // unfollow !

  const currentUser = await User.findByIdAndUpdate(req.currentUser.id, {
    $pull: { followingTags: req.params.tagId },
  });

  res.status(201).json({
    status: 'success',
    doc: currentUser,
  });
});

exports.addToReadingList = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) return next(new AppError('there is no post with this id', 404));
  const user = await User.findById(req.currentUser._id);
  if (!user) return next(new AppError('there is no user with this id', 404));

  if (req.currentUser.readingList.indexOf(req.params.postId) > 0)
    return next(new AppError('this post already added', 403));

  // add to reading list !

  const updatedUser = await User.findByIdAndUpdate(
    req.currentUser.id,
    {
      $push: { readingList: req.params.postId },
    },
    { new: true }
  );

  return res.status(200).json({
    status: 'success',
    doc: updatedUser,
  });
});
exports.removeFromReadingList = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) return next(new AppError('there is no post with this id', 404));
  const user = await User.findById(req.currentUser._id);
  if (!user) return next(new AppError('there is no user with this id', 404));

  if (req.currentUser.readingList.indexOf(req.params.postId) < 0)
    return next(new AppError('this post is not the reading list', 403));

  // remove from

  const updatedUser = await User.findByIdAndUpdate(
    req.currentUser.id,
    {
      $pull: { readingList: req.params.postId },
    },
    { new: true }
  );

  return res.status(200).json({
    status: 'success',
    doc: updatedUser,
  });
});

exports.getPostBySlug = catchAsync(async (req, res, next) => {
  const doc = await Post.findOne({ slug: req.params.slug }).populate({
    path: 'profile',
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getAllUsers = handlerFactory.getAll(User);
exports.getOneUser = handlerFactory.getOne(User, {
  path: 'userProfile',
  select: '-password',
});
exports.deleteOneUser = handlerFactory.deleteOne(User);
exports.getMe = (req, res, next) => {
  req.params.id = req.currentUser._id;

  next();
};
