const express = require('express');
const router = express.Router();
const HolidayController = require('../../controllers/v1/holidayController');
const { verifyToken, checkRole } = require('../../middlewares/authMiddleware');






// router.post('/create', verifyToken, checkRole('superAdmin'), CompanyController.createCompany);
// Branch routes
router.post('/', HolidayController.createHoliday);
router.patch('/:companyId', HolidayController.updateHoliday);
router.get('/:companyId', HolidayController.getHolidayById);
router.get('/', HolidayController.getAllHolidays);
router.delete('/:companyId', HolidayController.deleteHoliday);



module.exports = router;
