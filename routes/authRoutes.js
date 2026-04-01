const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuth, isHR } = require('../middleware/authMiddleware');

router.post('/login', authController.login);

router.post('/register', isAuth, isHR, authController.register);

router.get('/all', isAuth, isHR, authController.getAllEmployees);

router.delete('/delete/:id', isAuth, isHR, authController.deleteEmployee);

router.put('/update/:id', isAuth, isHR, authController.updateEmployee);

module.exports = router;