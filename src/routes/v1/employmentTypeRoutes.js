// routes/v1/userRoutes.js
const express = require('express');
const router = express.Router();
const employmentTypeController = require('../../controllers/v1/employmentTypeController');



router.post('/create-default', employmentTypeController.createDefault);
router.get('/', employmentTypeController.getAll);


module.exports = router;
