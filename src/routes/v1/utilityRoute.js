// routes/v1/userRoutes.js
const express = require('express');
const router = express.Router();
const UtilityController = require('../../controllers/v1/utilityController');
const { verifyToken, checkRole } = require('../../middlewares/authMiddleware');








router.get('/role',verifyToken, UtilityController.getRole);
router.get('/employment-type',verifyToken, UtilityController.getEmploymentType);



module.exports = router;
