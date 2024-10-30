// routes/v1/userRoutes.js
const express = require('express');
const router = express.Router();
const CompanyController = require('../../controllers/v1/companyController');
const { verifyToken, checkRole } = require('../../middlewares/authMiddleware');


router.post('/', verifyToken, checkRole('superAdmin'), CompanyController.createCompany);
router.get('/', verifyToken, checkRole('superAdmin'), CompanyController.getAllCompanies);
router.get('/:companyId', verifyToken, checkRole('superAdmin', 'admin', 'manager'), CompanyController.getCompanyById);
router.patch('/:companyId', verifyToken, checkRole('superAdmin'), CompanyController.updateCompanyById);
router.delete('/:companyId', verifyToken, checkRole('superAdmin'), CompanyController.deleteCompanyById);



// router.get('/testUser', verifyToken, checkRole('superAdmin', 'admin','manager'), UserController.testUser);


module.exports = router;
