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
    select: false,
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
  date: {
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

// Create validate email token
userSchema.methods.createValidateEmailToken = function () {
  const validateToken = crypto.randomBytes(32).toString('hex');

  this.validateEmailToken = crypto
    .createHash('sha256')
    .update(validateToken)
    .digest('hex');

  return validateToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
