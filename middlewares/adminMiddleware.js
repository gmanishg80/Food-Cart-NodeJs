// const JWT =  require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = async (req,res,next) => {

    try{
        // console.log(req.body.id)
        const user = await userModel.findById(req.body.id);
        // console.log(user)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        if(user.userType !== "admin"){
            return res.status(401).send({
                success: false,
                message: 'Only admin can access'
            })
        }
        else{
            next();
        }

    } catch(err) {
        console.log(err);
        res.status(401).send({
            success: false,
            message: 'Un-Authorized Access denied, only admin can access',
            error: err
        })
    }
}