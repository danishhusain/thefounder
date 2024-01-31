// routes/v1/userRoutes.js
const express = require('express');
const router = express.Router();
const UtilityController = require('../../controllers/v1/utilityController');
const { verifyToken, checkRole } = require('../../middlewares/authMiddleware');





// router.get('/testUser', verifyToken, checkRole('superAdmin', 'admin'), UserController.testUser);
router.post('/create', UtilityController.createUtilityData);
router.put('/update', UtilityController.updateUtilityData);
// router.post('/email-otp-verify', UserController.emailOtpVerify);



module.exports = router;
