const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controllers/v1/employeeController');
const { verifyToken, checkRole } = require('../../middlewares/authMiddleware');






router.post('/', verifyToken, checkRole('superAdmin'), EmployeeController.createEmployee);
router.get('/getall/:companyId', verifyToken, checkRole('superAdmin'), EmployeeController.getAllEmployees);
router.get('/:branchId', verifyToken, checkRole('superAdmin'), EmployeeController.getEmployeeById);
router.put('/:branchId', verifyToken, checkRole('superAdmin'), EmployeeController.updateEmployee);
router.delete('/:branchId', verifyToken, checkRole('superAdmin'), EmployeeController.deleteEmployee);
router.post('/login', EmployeeController.employeeLoginWithEmail);
router.post('/verify', EmployeeController.verifyOtpForEmployee);



module.exports = router;
