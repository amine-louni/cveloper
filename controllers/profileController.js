const request = require('request');
const Profile = require('../models/Profile');
const handlerFactory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.updateMyProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile.user.equals(req.currentUser._id)) {
    return next(
      new AppError(
        "You don't have the permission to perform the action with this item",
        403
      )
    );
  }
  if (!profile) {
    return next(new AppError('No document found with that ID', 404));
  }
  const updatedProfile = await Profile.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    status: 'success',
    doc: updatedProfile,
  });
});

exports.getAllProfiles = handlerFactory.getAll(Profile);
exports.getOneProfile = handlerFactory.getOne(Profile, {
  path: 'user',
  select: 'name avatar',
});
exports.createProfile = handlerFactory.createOne(Profile);
exports.updateProfile = handlerFactory.updateOne(Profile);
exports.deleteProfile = handlerFactory.deleteOne(Profile);

exports.getGithubProfile = async (req, res, next) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    request(options, (err, response, body) => {
      if (response.statusCode === 200) {
        return res.status(200).json(JSON.parse(body));
      }
      next(
        new AppError(
          'Some thing went wrong when fetching data from github api , check your user name'
        )
      );
    });
  } catch (err) {
    next(
      new AppError('Some thing went wrong when fetching data from github api')
    );
  }
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
exports.removeProfileExperience = catchAsync(async (req, res, next) => {
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

exports.addProfileEducation = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.currentUser._id });
  profile.education.unshift(req.body);
  await profile.save();
  res.status(200).json({
    doc: profile,
  });
});
exports.removeProfileEducation = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.currentUser._id });

  const filteredEducation = Array.from(profile.education).filter((el) => {
    return el.id !== req.params.id;
  });

  profile.education = filteredEducation;
  await profile.save();
  res.status(201).json({
    status: 'success',
    doc: profile,
  });
});
