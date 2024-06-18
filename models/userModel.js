const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: [true, 'user name required']
    },
    email : {
        type: String,
        required: [true, 'email required'],
        unique: true
    },
    password : {
        type: String,
        required: [true, 'password required']
    },
    address : {
        type: Array,
    },
    phone : {
        type: String,
        required: [true, 'phone number required']
    },
    userType : {
        type: String,
        required: [true, 'user type required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile : {
        type: String,
        default: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png'
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);