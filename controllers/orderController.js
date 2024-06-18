const orderModel = require('../models/orderModel');

const placeOrderController = async (req,res)=>{
    try{
        const{cart} = req.body;
        if(!cart){
            return res.status(500).send({
                success: false,
                message: 'Cart not found, fill all fields'
            })
        }
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });

        const newOrder = new orderModel({
            foods: cart,
            buyer:req.body.id
        })
        await newOrder.save();

        res.status(201).send({
        success:true,
        message: 'Order placed successfully',
        payment:total,
        newOrder: newOrder
    })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Place Order API',
            error: error.message
        })
    }
};

const orderStatusController = async (req,res) => {
    try{
        const orderId = req.params.id;
        if(!orderId){
            return res.status(404).send({
                success: false,
                message: 'Please provide a valid order Id'
            })
        }
        const {status} = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, {status:status}, {new:true});

        if(!order){
            return res.status(404).send({
                success: false,
                message: 'No order found with the given id, try again or change the order Id'
            })
        }

        res.status(200).send({
            success: true,
            message: 'Order status updated successfully',
            order
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in order statusS  API',
            error: error.message
        })
    }
};

module.exports = { placeOrderController, orderStatusController };