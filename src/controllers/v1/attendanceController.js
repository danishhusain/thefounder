const moment = require("moment");
const Attendance = require("../../models/attendance");
const CustomFunction = require('../../utils/CustomFunction');


var currentDate = CustomFunction.currentDate()
var currentTime = CustomFunction.currentTime()
var currentYearMonthDay = CustomFunction.currentYearMonthDay('ddd')
var currentYear = CustomFunction.currentYear('ddd')
var monthName = CustomFunction.monthName()




// Create new attendance record
exports.createAttendance = async (req, res) => {
    // console.log(
    //     "createAttendance",
    //     currentDate,
    //     currentTime,
    //     currentDate,
    //     currentYearMonthDay,
    //     currentYear,
    //     monthName
    // )

    const punchInTime = CustomFunction.currentTime()
    console.log("createAttendance currentTime", currentTime)

    try {
        const { employeeId, status } = req.body;
        const attendance = new Attendance({ employeeId, status, punchInTime });
        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        console.error('Error creating attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

;

// Get all attendance records
exports.getAllAttendance = async (req, res) => {

    try {
        const attendance = await Attendance.find();
        res.status(200).json(attendance);
    } catch (error) {
        console.error('Error getting attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get attendance record by ID
exports.getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.find({ employeeId: req.params.employeeId });
        if (!attendance) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }
        res.status(200).json(attendance);
    } catch (error) {
        console.error('Error getting attendance by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update attendance record
exports.updateAttendance = async (req, res) => {
    const punchOutTime = CustomFunction.currentTime();
    console.log("updateAttendance", punchOutTime)

    try {
        const { status } = req.body;
        const { employeeId } = req.params;
        const attendance = await Attendance.findOneAndUpdate(
            { employeeId: employeeId },
            { punchOutTime, status },
            { new: true }
        );

        if (!attendance) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        res.status(200).json(attendance);
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update attendance record
exports.punchOutAttendance = async (req, res) => {
    const punchOutTime = CustomFunction.currentTime();
    console.log("punchOutAttendance", punchOutTime)
    try {
        const { status } = req.body;
        const { employeeId } = req.params;
        const attendance = await Attendance.findOneAndUpdate(
            { employeeId: employeeId },
            { punchOutTime, status },
            { new: true }
        );

        if (!attendance) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        res.status(200).json(attendance);
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Delete attendance record
exports.deleteAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const attendance = await Attendance.findOneAndDelete({ employeeId: employeeId });
        if (!attendance) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }
        res.status(200).json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        console.error('Error deleting attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


