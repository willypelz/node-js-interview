const Joi = require('joi');

const FormValidator = require(__utils + '/formValidator')

/**
 * addMemberRequest
 *
 * @type {FormValidator}
 */
const addTagRequest = new FormValidator({
    name: Joi
        .string()
        .required(),
});

module.exports = addTagRequest;
