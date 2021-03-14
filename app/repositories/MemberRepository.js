const mongoose = require('mongoose');
require('../models/member');
require('../models/memberTag');
require('../models/tag');
const member = mongoose.model('Member');
const memberTag = mongoose.model('MemberTag');
const tag = mongoose.model('Tag');


class MemberRepository {

    constructor() {
        this.model = member;
        this.memberTag = memberTag;
        this.tag = tag;
    }

    async addMember(data) {
        return this.model.create(data);
    };

    async getMembers(limitPerPage, pageNumber) {
        const members = await this.model.find({})
            .skip((pageNumber - 1) * limitPerPage)
            .limit(limitPerPage)
            .sort({createdAt: -1})
            .exec();

        return this.getMembersWithTags(members);
    }


   async  getSingleMemberTag(member){
        const memberTags = await this.memberTag.find({member_id: member._id}).exec();
        const memberTagIds = await memberTags.map(e => e.tag_id);
        let tags = await this.tag.find({_id: {$in: memberTagIds}}).exec();

        return {...this.deepCopy(member), tags}
    }
    async getMembersWithTags(members){
        let membersWithTags = [];

        for (let member of members) membersWithTags.push(await this.getSingleMemberTag(member))

        return membersWithTags;
    }

    async getMember(id) {
        const member = await this.model.findOne({_id: id})
            .exec();
        
        return this.getSingleMemberTag(member)
    }

    async updateMember(id, data) {
        return this.model.findByIdAndUpdate({_id: id}, data, {new: true});
    }

    async deleteMember(id) {
        return this.model.findByIdAndDelete(id);
    };

    deepCopy(data) {
        return JSON.parse(JSON.stringify(data))
    }
}

module.exports = MemberRepository;
