const Joi = require('joi');

// Extending Joi before usage

/**
 * Leaving this here for who ever want to create a new type of validation
 *
 * this particular implementation does not work though because Joi does not support async operations internally
 *
 * @type {Seeder|void|*}
 */
const ExtendedJoi = Joi.extend((joi) => {
    return {
        name: 'dbField',
        base: joi.string(),
        language: {
            uniqueIndex: 'already exists',
            invalidModel: 'invalid model instance',
        },

        rules: [{
            name: 'uniqueIndex',
            params: {
                model: joi.any().required(),
                fieldName: joi.string(),
            },

            validate(params, value, state, options) {
                // TODO: Validate model params of type mongoose model before use
                state.key = state.key || params.fieldName;
                const modelResult = params.model.findOne({[state.key]: value});
                if (modelResult) {
                    return this.createError('dbField.uniqueIndex', {v: value}, state, options);
                }

                return value;
            }
        }]
    };
});

module.exports = ExtendedJoi;