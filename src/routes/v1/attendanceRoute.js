const express = require('express');
const router = express.Router();
const AttendanceController = require('../../controllers/v1/attendanceController');
const { checkWeekday } = require('../../middlewares/AttendanceMiddleware');






router.post('/', AttendanceController.createAttendance);
router.get('/', AttendanceController.getAllAttendance);
router.get('/:employeeId', AttendanceController.getAttendanceById);
router.put('/:employeeId', AttendanceController.updateAttendance);
router.patch('/:employeeId', AttendanceController.punchOutAttendance);
router.delete('/:employeeId', AttendanceController.deleteAttendance);



module.exports = router;
