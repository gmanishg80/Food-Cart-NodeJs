const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getUserController = async(req,res) => {
    try {
        const user = await userModel.findById({_id:req.body.id});

        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

        user.password = undefined;

        res.status(200).send({
            success: true,
            message: 'User get successful',
            user
        });

    }catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in get user API",
            error:err
        });
    }
};

const updateUserController = async (req, res) => {
    try{
        const user = await userModel.findById({_id: req.body.id});

        if(!user) {
            return res.status(404).send({
                sucess: false,
                message: "User not found"
            })
        }

        const { userName, address, phone } = req.body;

        if(userName) user.userName = userName;
        if(address) user.address = address;
        if(phone) user.phone = phone;

        await user.save();

        res.status(500).send({
            success: true,
            message: 'User updated successfully',
            user
        })



    }catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in update user API",
            error: err
        })
    }
};

const updatePasswordController = async (req, res) => {
    try{
        const user = await userModel.findById({_id: req.body.id});

        if(!user) {
            return res.status(404).send({
                sucess: false,
                message: "User not found"
            })
        }
        // console.log("here1")
        const {oldPassword, newPassword} = req.body;
        if(!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please provide all required information"
            })
        }
        // console.log("here2")


        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid password"
            })
        }
        // console.log("here3")

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await user.save();
        // console.log("here4")


        res.status(200).send({
            success: true,
            message: "Password updated successfully",
            user
        })

    }catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in update Password user API",
            error: err
        })
    }
};

const resetPasswordController = async (req, res) => {
    try{
        const {email, newPassword, answer} = req.body;

        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success: false,
                message:"Please enter all fields"
            });
        } 

        const user = await userModel.findOne({ email, answer });
        // console.log(user)
        if(!user){
            return res.status(500).send({
                success: false,
                message:"User not found or invalid credentials"
            });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        // console.log("here1")
        await user.save();

        res.status(200).send({
            success: true,
            message:"User Reset Successfully",
            user
        })

    }catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in reset Password",
            error: err
        })

    }
}

const deleteProfileController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "Your account has been deleted successfully"
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete profile API",
            error
        })
    }
}

module.exports = { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController };