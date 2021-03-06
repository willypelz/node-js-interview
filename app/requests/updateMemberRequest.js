const Joi = require('joi');

const FormValidator = require( '../utils/formValidator')

/**
 * addMemberRequest
 *
 * @type {FormValidator}
 */
const addMemberRequest = new FormValidator({
    name: Joi
        .string()
        .optional(),
    type: Joi
        .string()
        .optional()
        .valid('contractor', 'employee'),
    duration: Joi
        .when('type', {is: 'contractor', then: Joi.string().required()}),
    role: Joi
        .when('type', {is: 'employee', then: Joi.string().required()})

});

module.exports = addMemberRequest;
