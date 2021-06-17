const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 4,
        max: 100
    },
    email:{
        type: String,
        required: true,
        max:255,
        min:10,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phn:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    }

})

const User = mongoose.model('User', userSchema)
module.exports = User