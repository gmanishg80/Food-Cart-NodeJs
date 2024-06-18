const foodModels = require("../models/foodModels");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      description,
      price,
      foodTages,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }

    const newFood = new foodModels({
      title,
      imageUrl,
      description,
      price,
      foodTages,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });
    await newFood.save();

    res.status(201).send({
      success: true,
      message: "Food created successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Food API",
      error: error.message,
    });
  }
};

const getAllFoodsController = async (req, res) => {
    try{
        const foods = await foodModels.find({});
        if(!foods){
            return res.status(404).send({
                success: false,
                message: "no Food not found",
            })
        }

        return res.status(200).send({
            success: true,
            totalCount: foods.length,
            foods
        })

    }catch(err){
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Create Food API",
      error: err.message,
    });
    }
};

const getSingleFoodController = async (req,res)=>{
    try{
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success: false,
                message: "foodId not found"
            })
        }
        
        const food = await foodModels.find({});
        if(!food){
            return res.status(404).send({
                success: false,
                message: "no food item found"
            })
        }

        res.status(200).send({
                success: true,
                food,
        })

    }catch(err){
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Single Food API",
      error: err.message,
    });
    }
};

const getFoodByRestaurantController = async (req,res)=>{
    try{
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success: false,
                message: "restaurantId not found"
            })
        }
        
        const food = await foodModels.find({restaurant:restaurantId});
        if(!food){
            return res.status(404).send({
                success: false,
                message: "no food item with this restaurant found"
            })
        }

        res.status(200).send({
                success: true,
                food,
        })

    }catch(err){
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Single Food API",
      error: err.message,
    });
    }
};

const updateFoodController = async (req, res)=> {
    try{
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success: false,
                message: "foodId not found"
            })
        }
        
        const food = await foodModels.findById(foodId);
        if(!food){
            return res.status(404).send({
                success: false,
                message: "no food item with this foodId found"
            })
        }

        const {
            title,
            imageUrl,
            description,
            price,
            foodTages,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
          } = req.body;

          const updatedFood = await foodModels.findByIdAndUpdate(
            foodId, {
            title,
            imageUrl,
            description,
            price,
            foodTages,
            category,
            code,
            isAvailable,
            restaurant,
            rating
            }, {new:true}
          )
        res.status(200).send({
                success: true,
                message: 'Updated food data successfully',
                updatedFood,
        })
    }catch(err){
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Update Food API",
      error: err.message,
    });
    }
}

const deleteFoodController = async (req, res)=> {
    try{
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success: false,
                message: "foodId not found"
            })
        }

        const foodById = await foodModels.findById(foodId);
        if(!foodById){
            return res.status(404).send({
                success: false,
                message: "food item not found with given id"
            })
        }
        
        const food = await foodModels.findByIdAndDelete(foodId);
        if(!food){
            return res.status(404).send({
                success: false,
                message: "food item cannot be deleted, try again"
            })
        }

        res.status(200).send({
                success: true,
                message: 'deleted food data successfully',
                food,
        })
    }catch(err){
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in delete Food API",
      error: err.message,
    });
    }
}

module.exports = { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController};