const mongoose = require('mongoose');
const validator = require('validator');

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
  password: {
    type: String,
    required: [true, 'password is a required field'],
    minlength: [8, 'password must have at least 8 characters'],
  },
  avatar: {
    type: String,
    default: 'default.jpg',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
