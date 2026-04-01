const express = require('express');
const router = express.Router();
const deptController = require('../controllers/departmentController');
const {isHR , isAuth} = require('../middleware/authMiddleware');

// only hr who can add employees
router.post('/addDept', isHR, deptController.createDepartment);

//
router.get('/allDept', isHR, deptController.getAllDepartments);

module.exports = router;