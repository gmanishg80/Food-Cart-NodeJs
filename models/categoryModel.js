const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Category title is required']
    },
    imageUrl:{
        type: String,
        default: 'https://www.google.com/url?q=https://www.etsy.com/in-en/listing/1462348932/premade-restaurant-logo-design-chef-hat%3Fgpla%3D1%26gao%3D1%26&opi=95576897&sa=U&ved=0ahUKEwjWiKWGrICGAxUX-DgGHeQ4BecQwSsITA&usg=AOvVaw2oTwVSkpe8yV4h5K93DjpV'
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Category', categorySchema);