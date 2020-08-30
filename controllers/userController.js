const User = require('../models/User');
const Profile = require('../models/Profile');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = handlerFactory.getAll(User);
exports.getOneUser = handlerFactory.getOne(User);
exports.deleteOneUser = handlerFactory.deleteOne(User);
exports.getMe = (req, res, next) => {
  req.params.id = req.currentUser._id;

  next();
};
exports.deleteOneUserAndItsProfile = catchAsync(async (req, res, next) => {
  await Profile.findOneAndRemove({ user: req.currentUser._id });
  await User.findOneAndRemove({ _id: req.currentUser.id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
