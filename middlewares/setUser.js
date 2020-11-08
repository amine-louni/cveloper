const setTheUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.currentUser._id;

  next();
};

module.exports = setTheUserId;
