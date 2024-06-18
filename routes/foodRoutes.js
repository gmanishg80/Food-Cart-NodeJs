const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController } = require('../controllers/foodController');

const router = express.Router();

router.post('/create', authMiddleware, createFoodController);

router.get('/getAll', getAllFoodsController);

router.get('/get/:id', getSingleFoodController);

router.get('/get/restaurant/:id', getFoodByRestaurantController);

router.put('/update/:id', authMiddleware, updateFoodController);

router.delete('/delete/:id', authMiddleware, deleteFoodController);



module.exports = router;