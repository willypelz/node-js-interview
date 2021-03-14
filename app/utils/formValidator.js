const Joi = require('./extendedJoi')
const mongoose = require('mongoose')
// TODO: More improvement can be made to this helper, keeping it simple for current use case

/**
 * FormValidator constructor for seamless API
 * @param validationRules
 * @returns {FormValidator}
 * @constructor
 */
FormValidator = function FormValidator(validationRules) {
    this.JoiInstance = Joi.object(validationRules);

    return this;
};

/**
 * This is helper if you would rather continue your validation with Joi until this helper is improved more
 * @returns {Joi.ObjectSchema<any>}
 */
FormValidator.prototype.getJoiInstance = function () {
    return this.JoiInstance;
};

/**
 * `this` FormValidator validate method. Having some default options configuration
 * Method takes the same options configuration as `Joi.validate(...)`.
 * Check Joi API reference for available options
 *
 * Note: this does not return the same schema as `Joi.validate(...)`
 *
 * @param data
 * @param options
 * @returns {{NormalizedValue: any, FormattedError: {}}}
 */
FormValidator.prototype.validate = function (data, options = {abortEarly: false}) {
    let FormattedError = {};

    const {
        error: ValidationError,
        value: ValidationValue
    } = this.JoiInstance.validate(data, options);

    if (ValidationError) {
        // Format error object for easy consumption
        ValidationError
            .details
            .forEach(e => {

                // FormattedError[e.context.label] = {
                //     message: e.message.replace(/"/g, ''), // remove  double quotes added by Joi
                //     path: e.path.join('.'),
                //     key: e.context.key
                // }

                FormattedError[e.context.label] = e.message.replace(/"/g, '');
            });
    } else {
        FormattedError = undefined; // Comply to Joi return schema type for `error` if there is no error
    }

    return {
        FormattedError,
        NormalizedValue: ValidationValue // TODO: research if there is also a better way to more Normalize handle this in the future
    };
};

module.exports = FormValidator;