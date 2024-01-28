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
    unique: true,

  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  accountStatus: {
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
  // loginTime: { type: Date },
  // logoutTime: { type: Date },
  // Fields to track login and logout events
  loginHistory: [
    {
      timestamp: { type: Date, default: Date.now },
      ipAddress: { type: String },
    },
  ],
  logoutHistory: [
    {
      timestamp: { type: Date, default: Date.now },
    },
  ],

  createdAt: { type: Date, default: Date.now },

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




