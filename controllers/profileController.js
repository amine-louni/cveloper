const Profile = require('../models/Profile');
const handlerFactory = require('../utils/handlerFactory');

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
exports.getMyProfile = (req, res, next) => {
  req.params.id = req.currentUser._id;

  next();
};
