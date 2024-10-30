const express = require('express');
const rootRouter = express.Router();
const user = require('./v1/userRoutes');
const userInformationRoutes = require('./v1/userInformationRoutes');
const utilityRoute = require('./v1/utilityRoute');
const companyRoutes = require('./v1/companyRoutes');
const branchRoute = require('./v1/branchRoute');
const employeeRoutes = require('./v1/employeeRoutes');
const attendanceRoute = require('./v1/attendanceRoute');
const weekendRoutes = require('./v1/weekendRoutes');
const holidayRoutes = require('./v1/holidayRoutes');
const LeaveRoutes = require('./v1/leaveRoutes');



rootRouter.use('/user', user)
rootRouter.use('/information', userInformationRoutes);
rootRouter.use('/utility', utilityRoute);
rootRouter.use('/company', companyRoutes);
rootRouter.use('/branch', branchRoute);
rootRouter.use('/employee', employeeRoutes);

// Attendance
rootRouter.use('/attendance', attendanceRoute);
rootRouter.use('/weekends', weekendRoutes);
rootRouter.use('/holiday', holidayRoutes);
rootRouter.use('/leave', LeaveRoutes);


module.exports = rootRouter