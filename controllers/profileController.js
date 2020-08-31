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
  if (!req.body.user) req.body.user = req.currentUser._id;

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
exports.addProfileExperience = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.currentUser._id });
  profile.experience.unshift(req.body);
  await profile.save();
  res.status(200).json({
    doc: profile,
  });
});
exports.removeExperience = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.currentUser._id });

  const filteredExperience = Array.from(profile.experience).filter((el) => {
    return el.id !== req.params.id;
  });

  profile.experience = filteredExperience;
  await profile.save();
  res.status(201).json({
    status: 'success',
    doc: profile,
  });
});
