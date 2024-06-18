const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req,res) => {
    try{
        const {title,imageUrl} = req.body;

        if(!title){
            return res.status(500).send({
                success: false,
                message: "Please enter a title"
            })
        } 

        const newCategory = new categoryModel({title,imageUrl});
        await newCategory.save();

        res.status(201).send({
            success: true,
            message: "Category created successfully",
            newCategory: newCategory
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Create Category API',
            error: error.message
        })
    }
}

const getAllCategoryController = async (req, res) => {
    try{
        const categories = await categoryModel.find({});

        if(!categories){
            return res.status(404).send({
                sucess: false,
                message: 'No Restaurants found'
            });
        }

        res.status(200).send({
            success: true,
            totalCount: categories.length,
            categories
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

const updateCategoryController = async (req, res) => {
    try{
    const {id} = req.params;
    const {title, imageUrl} = req.body; 

    const updateCategory = await categoryModel.findByIdAndUpdate(id, {title: title, imageUrl:imageUrl}, {new: true});
    
    if(!updateCategory) {
        return res.status(500).send({
            success: false,
            message:"No category found"
        })
    }

    return res.status(200).send({
        success: true,
        message:"category updated successfully",
        updateCategory: updateCategory
    })

    }catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in update category API",
            error: err
        })
    }
}

const deleteCategoryController = async (req, res) => {
    try{
    const {id} = req.params;
// console.log("here1")
    if(!id){
        return res.status(500).send({
            success: false,
            message:"No user id found"
        })
    }
    // console.log("here2")


    const findById = await categoryModel.findById(id);
    
    if(!findById) {
        return res.status(500).send({
            success: false,
            message:"No category of the given id found"
        })
    }
    // console.log("here3")

    const deleteCategory = await categoryModel.findByIdAndDelete(id);
    // console.log("here4")

    if(!deleteCategory) {
        return res.status(500).send({
            success: false,
            message:"category can't be deleted, try again"
        })
    }
    // console.log("here5")



    return res.status(200).send({
        success: true,
        message:"category deleted successfully",
        deleteCategory
    })

    }catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in delete category API",
            error: err
        })
    }
}

module.exports = { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController };