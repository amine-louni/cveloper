const crypto = require('crypto');
const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

//Helpers
const createSendToken = (user, statusCode, req, res) => {
  const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    data: {
      token,
      user,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  // 1) Generate the random validate email token
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  const validateEmailToken = user.createValidateEmailToken();
  await user.save({ validateBeforeSave: false });

  // 2) Send it to user's email (TO DO)
  try {
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
      token: validateEmailToken,
    });
  } catch (err) {
    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.validateEmail = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    validateEmailToken: hashedToken,
  });

  // 2) If token has not expired, and there is user, set `validatedWithEmail` to `true`
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.validatedWithEmail = true;
  user.validateEmailToken = undefined;

  await user.save({ validateBeforeSave: false });

  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // Check if token exits with the req
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    next(
      new AppError('you are not logged in , please login and try again', 401)
    );

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.ACCESS_TOKEN_KEY
  );

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.currentUser = currentUser;
  next();
});
