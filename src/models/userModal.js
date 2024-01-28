const mongoose = require('mongoose');
const crypto = require('crypto');



const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomBytes(8).toString('hex')
  },
  userName: {
    type: String,
    trim: true,
  },
  number: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: null,
    trim: true,
  },
  links: {
    type: [String],
    default: [],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  fcmToken: {
    type: String,
    default: null,
  },
  deviceType: {
    type: String,
    default: null,
    trim: true,
  },
  token: {
    type: String,
    default: null,
  },
  resetToken: {
    type: String,
    default: null,
  },
  roles: [{
    type: String,
    enum: ['superAdmin', 'admin', 'manager', 'employee']
  }],
  emailVerification: {
    otp: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },

});

module.exports = mongoose.model('user', userSchema);




