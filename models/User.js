const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is a required field'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email is a required field'],
    unique: [true, 'this email is already registered'],
  },
  password: {
    type: String,
    required: [true, 'password is a required field'],
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
