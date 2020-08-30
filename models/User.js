const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is a required field'],
    minlength: [2, 'name must have at least 2 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email is a required field'],
    unique: [true, 'this email is already registered'],
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  validatedWithEmail: {
    type: Boolean,
    default: false,
  },
  validateEmailToken: String,
  password: {
    type: String,
    required: [true, 'password is a required field'],
    minlength: [8, 'password must have at least 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'password confirmation is a required field'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'the passwords are not equal',
    },
  },
  avatar: {
    type: String,
    default: 'default.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Encrypting the password before save
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});
// verify password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Create validate email token
userSchema.methods.createValidateEmailToken = function () {
  const validateToken = crypto.randomBytes(32).toString('hex');

  this.validateEmailToken = crypto
    .createHash('sha256')
    .update(validateToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 1000 * 60 * 10;

  return validateToken;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
