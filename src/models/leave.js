const mongoose = require('mongoose');
const CustomFunction = require('../utils/CustomFunction');


const leaveSchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        required: true
    },
    leaveId: {
        type: String,
        required: true,
    },
    leaveType: {
        type: String,
        enum: ['Annual', 'Sick', 'Maternity', 'Paternity', 'Unpaid'],
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'cancelled'],
        default: 'Pending'
    },
    Days: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
