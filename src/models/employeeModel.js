const mongoose = require('mongoose');
const crypto = require('crypto');



const employeeSchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
    },
    branchId: {
        type: String,
        trim: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
        default: () => crypto.randomBytes(3).toString('hex')
    },
    name: {
        type: String,
        trim: true,
    },
    number: {
        type: String,
        trim: true,
        // unique: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    accountStatus: {
        type: Boolean,
        default: false,
    },
    jwtToken: {
        type: String,
        default: null,
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
            // required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },

});

exports.Employee = mongoose.model('employee', employeeSchema);