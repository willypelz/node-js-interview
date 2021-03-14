const Joi = require('joi');

const FormValidator = require(__utils + '/formValidator')

/**
 * addMemberRequest
 *
 * @type {FormValidator}
 */
const updateMemberTagRequest = new FormValidator({
    member_id: Joi
        .string()
        .required(),
    tag_id: Joi
        .string()
        .required(),

});

module.exports = updateMemberTagRequest;
