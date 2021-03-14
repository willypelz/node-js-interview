const Joi = require('joi');

const FormValidator = require(__utils + '/formValidator')

/**
 * addMemberRequest
 *
 * @type {FormValidator}
 */
const updateTagRequest = new FormValidator({
    name: Joi
        .string()
        .required(),
});

module.exports = updateTagRequest;
