// routes/v1/userRoutes.js
const express = require('express');
const router = express.Router();
const UserInformationController = require('../../controllers/v1/userInformationController');
const { verifyToken, checkRole } = require('../../middlewares/authMiddleware');


//get userId from params
router.post('/create/:userId', verifyToken, checkRole('superAdmin', 'admin', 'subAdmin', 'manager', 'employee'), UserInformationController.createUserInformation);
router.get('/getall', verifyToken, checkRole('superAdmin',), UserInformationController.getAllUsersInformation);
router.get('/getone/:userId', verifyToken, checkRole('superAdmin', 'admin', 'subAdmin', 'manager', 'employee'), UserInformationController.getUserInformationById);
router.put('/update/:userId', verifyToken, checkRole('superAdmin', 'admin', 'subAdmin', 'manager', 'employee'), UserInformationController.updateUserInformationById);
router.delete('/:userId', verifyToken, checkRole('superAdmin','admin'), UserInformationController.deleteUserInformationById);


module.exports = router;
