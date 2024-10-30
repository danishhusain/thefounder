const express = require('express');
const router = express.Router();
const LeaveController = require('../../controllers/v1/leaveController');
const { verifyToken, checkRole } = require('../../middlewares/authMiddleware');






router.post('/', LeaveController.submitLeaveRequest);
router.patch('/:leaveId', LeaveController.updateLeaveRequestStatus);
router.get('/:employeeId', LeaveController.getLeaveRequestsByUser);
router.delete('/:leaveId', LeaveController.cancelLeave);
// router.get('/history/:employeeId', LeaveController.getLeaveHistory);



module.exports = router;
