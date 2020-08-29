const User = require('../models/User');
const handlerFactory = require('../utils/handlerFactory');

exports.getOneUser = handlerFactory.getOne(User);
exports.getMe = (req, res, next) => {
  req.params.id = req.currentUser._id;

  next();
};
