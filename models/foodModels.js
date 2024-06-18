const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'food title is required']
    },
    description: {
        type: String,
        required: [true, 'food description is required']
    },
    price: {
        type: Number,
        required: [true, 'price description is required']
    },
    imageUrl: {
        type: String,
        default: 'https://www.google.com/url?q=https://www.etsy.com/in-en/listing/1462348932/premade-restaurant-logo-design-chef-hat%3Fgpla%3D1%26gao%3D1%26&opi=95576897&sa=U&ved=0ahUKEwjWiKWGrICGAxUX-DgGHeQ4BecQwSsITA&usg=AOvVaw2oTwVSkpe8yV4h5K93DjpV'
    },
    foodTags:{
        type: String,
        },
    category:{
        type: String,
        },
    code:{
        type: String,
    },
    isAvailable:{
        type: Boolean,
        default: true,
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    rating:{
        type: Number,
        default: 5,
        min: 1,
        max:5,
    },
    ratingCount:{
        type: String
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('foods', foodSchema);