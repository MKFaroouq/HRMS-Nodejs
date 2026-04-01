const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

const { isAuth, isHR } = require('../middleware/authMiddleware');//1
router.post('/apply', isAuth, leaveController.applyLeave);// router.post('/apply', leaveController.applyLeave);
// router.post('/apply', isHR, leaveController.applyLeave);
// 2 => show all pending
// router.get('/all-pending', isAuth, leaveController.getPendingRequests);
router.get('/all-pending', isAuth, isHR, leaveController.getPendingRequests);// 3 => statud of leaving ( accept or reject ) - hr should answer
// router.put('/status/:id', isAuth, leaveController.updateLeaveStatus);
router.put('/status/:id', isAuth, isHR, leaveController.updateLeaveStatus);
module.exports = router;