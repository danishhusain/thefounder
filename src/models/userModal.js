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
  createdAt: { type: Date, default: Date.now },
  jobTitle: {
    type: String,
  },
  employmentType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contractual/Temporary', 'Freelance/Consultant', 'Internship']

  },
  roles: [{
    type: String,
    enum: ['superAdmin', 'admin', 'subAdmin', 'manager', 'employee']
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

const User = mongoose.model('user', userSchema);



const loginHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String },
});

const LoginHistory = mongoose.model('LoginHistory', loginHistorySchema);


const logoutHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
});

const LogoutHistory = mongoose.model('LogoutHistory', logoutHistorySchema);

module.exports = { LoginHistory, LogoutHistory, User };


