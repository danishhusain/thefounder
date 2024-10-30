// routes/weekendRoutes.js
const express = require('express');
const router = express.Router();
const weekendController = require('../../controllers/v1/weekendController');

// Create weekend entries
router.post('/', weekendController.createWeekend);
router.patch('/:companyId', weekendController.updateWeekend);
router.get('/:companyId', weekendController.getWeekendByCompanyId);

module.exports = router;
