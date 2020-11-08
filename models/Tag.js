const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Tag must have a text '],
  },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
