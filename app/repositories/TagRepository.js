const mongoose = require('mongoose');
require('../models/tag');
const tag = mongoose.model('Tag');


class TagRepository {

    constructor() {
        this.model = tag;
    }

    async addTag(data) {
        return this.model.create(data);
    };

    async getTags(limitPerPage, pageNumber) {
        return await this.model.find({})
            .skip((pageNumber - 1) * limitPerPage)
            .limit(limitPerPage)
            .sort({createdAt: -1})
            .exec();
    }

    async getTag(id) {
        return await this.model.findOne({_id: id})
            .exec();
    }

    async updateTag(id, data) {
        return this.model.findByIdAndUpdate({_id: id}, data, {new: true});
    }

    async deleteTag(id) {
        return this.model.findByIdAndDelete(id);
    };
}

module.exports = TagRepository;
