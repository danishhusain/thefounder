// models/Company.js
const mongoose = require('mongoose');
const crypto = require('crypto');


const companySchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
        // unique: true,
        // default: () => crypto.randomBytes(8).toString('hex')
    },
    userId: { type: String, required: true, unique: true, },
    companyName: { type: String, required: true },
    staffCount: { type: Number,  },
    category: { type: String, required: true },
    numberOfBranches: { type: Number,  },
    gstNumber: { type: String, },
    location: { type: String, required: true },
    email: { type: String, },
    createdTime: { type: Date, default: Date.now },
    status: { type: String, default: 'Active' },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
