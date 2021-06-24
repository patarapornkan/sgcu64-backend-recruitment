const mongoose = require('mongoose')
const Location = require('./location');

const userSchema = new mongoose.Schema({
    phone_no: {
        type: String,
        required: true,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User