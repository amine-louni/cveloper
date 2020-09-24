const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'a profile must belong to a user'],
  },
  company: {
    type: String,
  },
  title: {
    type: String,
    default: 'employee',
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    trim: true,
    required: [true, 'status is  a required field'],
  },
  skills: {
    type: [String],
    required: [true, 'skills is  a required field'],
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

ProfileSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name avatar ',
  });

  next();
});
const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
