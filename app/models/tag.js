const mongoose = require('mongoose');

let TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }

}, {
    timestamps: true
});


module.exports = mongoose.model('Tag', TagSchema)
