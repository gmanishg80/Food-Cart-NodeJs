const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const { placeOrderController, orderStatusController } = require('../controllers/orderController');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/placeorder', authMiddleware, placeOrderController);

router.post('/orderStatus/:id', authMiddleware, adminMiddleware, orderStatusController);

module.exports = router;