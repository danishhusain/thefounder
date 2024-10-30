const Leave = require('../../models/leave');
const CustomFunction = require('../../utils/CustomFunction');


// Submit a leave request
exports.submitLeaveRequest = async (req, res) => {

    try {
        const { employeeId, leaveType, startDate, endDate } = req.body;

        const leave = new Leave({
            employeeId,
            leaveId: `leave${CustomFunction.generateCustomId()}`,
            leaveType,
            startDate,
            endDate
        });

        const savedLeave = await leave.save();
        res.status(201).json(savedLeave);
    } catch (error) {
        console.error("Error submitting leave request:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get leave requests for a specific user
exports.getLeaveRequestsByUser = async (req, res) => {
    // console.log("getLeaveRequestsByUser", CustomFunction.generateCustomId(),req.storeId)

    try {
        const { employeeId } = req.params; // Assuming user ID is stored in the req.user object

        const leaveRequests = await Leave.find({ employeeId: employeeId });
        res.status(200).json(leaveRequests);
    } catch (error) {
        console.error("Error fetching leave requests:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Approve or reject a leave request
exports.updateLeaveRequestStatus = async (req, res) => {
    try {
        const { leaveId } = req.params;
        const { status } = req.body;
        console.log(leaveId)

        // Validate if the status is valid
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Status must be either "Approved" or "Rejected".' });
        }

        const updatedLeave = await Leave.findOneAndUpdate({leaveId:leaveId}, { status }, { new: true });
        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }
        res.status(200).json(updatedLeave);
    } catch (error) {
        console.error("Error updating leave request status:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// Controller to cancel leave
exports.cancelLeave = async (req, res) => {
  const { leaveId } = req.params;

  try {
    // Find the leave by ID
    const leave = await Leave.findOneAndUpdate({leaveId:leaveId});
    
    // Check if leave exists
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    // Update leave status to cancelled
    leave.status = 'cancelled';

    // Save the updated leave
    await leave.save();

    res.status(200).json({ message: 'Leave cancelled successfully', leave });
  } catch (error) {
    console.error('Error cancelling leave:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get all leave history of an employee
exports.getLeaveHistory = async (req, res) => {
  const { employeeId } = req.params;

  try {
    // Find all leaves for the employee
    const leaveHistory = await Leave.find({ employee: employeeId });

    res.status(200).json(leaveHistory);
  } catch (error) {
    console.error('Error fetching leave history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
