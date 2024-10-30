
// routes/v1/userRoutes.js
const express = require('express');
const router = express.Router();
const BranchController = require('../../controllers/v1/branchController');
const { verifyToken, checkRole } = require('../../middlewares/authMiddleware');






// router.post('/create', verifyToken, checkRole('superAdmin'), CompanyController.createCompany);
// Branch routes
router.post('/', verifyToken, BranchController.createBranch);
router.get('/all/:userId', verifyToken, BranchController.getAllBranches);
router.get('/:branchId', verifyToken, BranchController.getBranchById);
router.put('/:branchId', verifyToken, BranchController.updateBranchById);
router.delete('/:branchId', verifyToken, BranchController.deleteBranchById);





// router.get('/testUser', verifyToken, checkRole('superAdmin', 'admin','manager'), UserController.testUser);


module.exports = router;
