const mongoose = require('mongoose');

let MemberTagSchema = new mongoose.Schema({
    member_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Member'
    },
    tag_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Tag'
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

MemberTagSchema.virtual('member', {
    ref: 'Member',
    localField: 'member_id',
    foreignField: '_id',
    justOne: true
});

MemberTagSchema.virtual('tag', {
    ref: 'Tag',
    localField: 'tag_id',
    foreignField: '_id',
    justOne: true
});

MemberTagSchema.virtual('tag', {
    ref: 'Tag',
    localField: 'tag_id',
    foreignField: '_id',
    justOne: true
});
module.exports = mongoose.model('MemberTag', MemberTagSchema)
