const Profile = require('../models/Profile');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllProfiles = handlerFactory.getAll(Profile);
exports.getOneProfile = handlerFactory.getOne(Profile, {
  path: 'user',
  select: 'name avatar',
});
exports.createProfile = handlerFactory.createOne(Profile);
exports.updateProfile = handlerFactory.updateOne(Profile);
exports.deleteProfile = handlerFactory.deleteOne(Profile);
exports.setTheUserId = (req, res, next) => {
  console.log('setting the user id');
  if (!req.body.user) req.body.user = req.currentUser._id;
  console.log(req.body);
  next();
};
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
