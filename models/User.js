const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    identity: {
        type: String,
        required: true,
        default: "employee"

    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = User = mongoose.model('users', userSchema);