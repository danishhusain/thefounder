// routes/v1/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/v1/userController');
const { verifyToken } = require('../../middlewares/authMiddleware');




router.get('/testUser', verifyToken, UserController.testUser);
router.post('/register', UserController.register);
router.post('/email-otp-verify', UserController.emailOtpVerify);
router.post('/login', UserController.login);
router.get('/:userId', verifyToken, UserController.getUserById);
router.post('/reset-password', UserController.resetPassword);
router.post('/reset-verify-otp', UserController.verifyOTP);
router.post('/password-update', UserController.passwordUpdate);


module.exports = router;
