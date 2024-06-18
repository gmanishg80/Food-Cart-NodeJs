const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if(!title || !coords){
        return res.status(500).send({
            success: false,
            message: 'Please provide a title and address'
        })
    }    

    const checkTitle = await restaurantModel.findOne({
        title,
    });

    if(checkTitle){
        return res.status(403).send({
            success: false,
            message: 'Title already exists'
        })
    }   

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(201).send({
        success: true,
        message: 'Restaurant created successfully',
        newRestaurant: newRestaurant
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in creating restaurant API request",
      error,
    });
  }
};

const getAllRestaurantController = async (req, res) => {
    try{
        const allRestaurants = await restaurantModel.find({});

        if(!allRestaurants){
            return res.status(404).send({
                sucess: false,
                message: 'No Restaurants found'
            });
        }

        res.status(200).send({
            success: true,
            totalCount: allRestaurants.length,
            allRestaurants: allRestaurants
        });

    }catch(error){
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in getting All restaurant API request",
      error,
    });
    }

};

const getRestaurantByIdController = async (req, res) => {
    try{
        const restaurantId = req.params.id;
        // console.log("here1")
        if(!restaurantId){
            return res.status(404).send({
                sucess: false,
                message: 'No provided id found'
            });
        }
        // console.log("here2")

        const restaurant = await restaurantModel.findById(restaurantId);
        // console.log("here3")

        if(!restaurant){
            return res.status(404).send({
                sucess: false,
                message: 'No Restaurant with the given id found'
            });
        }

        // console.log("here4")
        res.status(200).send({
            success: true,
            restaurant
        });

    }catch(error){
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in getting restaurant by id API request",
      error,
    });
    }
};

const deleteRestaurantController = async (req, res) => {
    try{
        const restaurantId = req.params.id;
        console.log("here1")
        if(!restaurantId){
            return res.status(404).send({
                sucess: false,
                message: 'No provided id found'
            });
        }
        console.log("here2")

        await restaurantModel.findByIdAndDelete(restaurantId);
        console.log("here3")

        res.status(200).send({
            success: true,
            message: "Restaurants deleted successfully"
        });
        

    }catch(error){
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in getting delete API request",
      error,
    });
    }
}

module.exports = { createRestaurantController,getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController };
