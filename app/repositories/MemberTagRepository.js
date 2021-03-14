const mongoose = require('mongoose');
require('../models/memberTag');
const memberTag = mongoose.model('MemberTag');


class MemberTagRepository {

    constructor() {
        this.model = memberTag;
    }

    async addMemberTag(data) {
        return this.model.create(data);
    };

    async getMemberTag(id) {
        return await this.model.findOne({_id: id})
            .exec();
    }

    async updateMemberTag(id, data) {
        return this.model.findByIdAndUpdate({_id: id}, data, {new: true});
    }

    async deleteMemberTag(id) {
        return this.model.findByIdAndDelete(id);
    };
}

module.exports = MemberTagRepository;
