const Joi = require('joi');

const FormValidator = require( '../utils/formValidator')

/**
 * addMemberRequest
 *
 * @type {FormValidator}
 */
const addMemberTagRequest = new FormValidator({
    member_id: Joi
        .string()
        .required(),
    tag_id: Joi
        .string()
        .required(),

});

module.exports = addMemberTagRequest;
