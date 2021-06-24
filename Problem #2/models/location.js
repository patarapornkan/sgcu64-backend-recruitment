const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    num_user: {
        type: Number,
        min: 0
    }
})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location