const mongoose = require('mongoose');
const crypto = require('crypto');
const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Profile = require('./Profile');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minlength: [2, 'user name must have at least 2 characters'],
      required: [true, 'user name is a required field'],
      unique: [true, 'This username is already taken 😥😥'],
      trim: true,
    },
    slug: String,
    firstName: {
      type: String,
      required: [true, 'first name is a required field'],
      minlength: [2, 'first name must have at least 2 characters'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'last name is a required field'],
      minlength: [2, 'last name must have at least 2 characters'],
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
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: 'default.jpg',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    followingUsers: [mongoose.Schema.Types.ObjectId],
    followingTags: [mongoose.Schema.Types.ObjectId],
    readingList: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('userProfile', {
  ref: 'Profile',
  foreignField: 'user',
  localField: '_id',
});

// Encrypting the password before save
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  this.slug = `${slugify(this.userName, { lower: true })}`;
  next();
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.populate({
    path: 'readingList',

    model: 'Post',
    select: '-user',
  });

  next();
});
// delete a profile when deleting its user
userSchema.pre(/^findByIdAndDelete/, async function (next) {
  try {
    //@ todo delete posts
    await Profile.findOneAndRemove({ user: this._id });
  } catch (err) {
    console.log(err);
  }
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
