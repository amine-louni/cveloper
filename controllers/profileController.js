const Profile = require('../models/Profile');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.setProfileUsersIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.profile) req.body.profile = req.params.profileId;
  if (!req.body.user) req.body.user = req.currentUser.id;
  next();
};
exports.getAllProfiles = handlerFactory.getAll(Profile);
exports.getOneProfile = handlerFactory.getOne(Profile, {
  path: 'user',
  select: 'name avatar',
});
exports.createProfile = handlerFactory.createOne(Profile);
exports.updateProfile = handlerFactory.updateOne(Profile);
exports.deleteProfile = handlerFactory.deleteOne(Profile);
exports.getMyProfileByUserId = catchAsync(async (req, res, next) => {
  const myProfile = await Profile.findOne({
    user: req.currentUser._id,
  });

  res.status(200).json({
    status: 'success',
    doc: myProfile,
  });

  next();
});
