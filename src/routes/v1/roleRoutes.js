// routes/v1/userRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/v1/roleController');

router.post('/create-default', roleController.createDefault);
router.get('/', roleController.getAll);




module.exports = router;
