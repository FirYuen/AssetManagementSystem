const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    passwd: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now()
    },
})

module.exports = User = mongoose.model('users',userSchema);