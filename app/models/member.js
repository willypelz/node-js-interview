const mongoose = require('mongoose');

let MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['contractor', 'employee'],
        required: true
    },
    duration: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },

}, {
    timestamps: true
});


module.exports = mongoose.model('Member', MemberSchema)
