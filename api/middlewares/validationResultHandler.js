const AppError = require('../utils/appError');

const handleValidationResult = (validationResult) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  return function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsString = errors
        .array()
        .map((el) => el.msg)
        .join(' , ');
      const message = `${errorsString}`;
      return next(new AppError(message, 403));
    }
    next();
  };
};

module.exports = handleValidationResult;
