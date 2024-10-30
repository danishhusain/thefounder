// models/Branch.js
const mongoose = require('mongoose');
const crypto = require('crypto');


const branchSchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
    },
    branchId: {
        type: String,
        required: true,
        unique: true,
        default: () => crypto.randomBytes(8).toString('hex')
    },
    userId: { type: String, required: true },
    branchName: { type: String, required: true },
    staffCount: { type: Number, required: true },
    location: { type: String, required: true },
    attendanceRadius: { type: Number, required: true },
    createdTime: { type: Date, default: Date.now },
    status: { type: String, default: 'Active' },
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
