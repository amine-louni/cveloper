const setTheUserId = (req, res, next) => {
  if (!req.body.userId) req.body.userId = req.currentUser._id;

  next();
};

module.exports = setTheUserId;
