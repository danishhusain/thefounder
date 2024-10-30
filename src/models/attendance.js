// const mongoose = require('mongoose');

// const attendanceSchema = new mongoose.Schema({
//     employeeId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Employee', // Reference to the Employee model
//         required: true
//     },
//     punchInTime: {
//         type: Date,
//         required: true
//     },
//     punchOutTime: {
//         type: Date
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//         index: true // Indexing for faster queries based on date
//     },
//     status: { type: String, enum: ['Present', 'Leave', 'Absent'], required: true }


// });

// const Attendance = mongoose.model('Attendance', attendanceSchema);

// module.exports = Attendance;







////////
const mongoose = require('mongoose');
const CustomFunction = require('../utils/CustomFunction');

const currentDateString = CustomFunction.currentDate()
const currentDate = new Date(currentDateString);
const currentTime = CustomFunction.currentTime()
const currentYearMonthDay = CustomFunction.currentYearMonthDay('ddd')
const currentYear = CustomFunction.currentYear('ddd')
const monthName = CustomFunction.monthName()



const attendanceSchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: currentDateString,
        index: true
    },
    punchInTime: {
        type: String,
        // default: currentTime
    },
    punchOutTime: {
        type: String
    },

    status: { type: String, enum: ['Present', 'Absent', 'halfDay'], required: true },
    timestamp: { type: Date, default: Date.now },

});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
