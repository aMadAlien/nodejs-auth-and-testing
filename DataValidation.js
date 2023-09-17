const Joi = require('@hapi/joi');
const User = require('./models/User');

class DataValidation {
    static registerValidation(req) {
        const validationSchema = Joi.object({
            name: Joi.string().min(2).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(8).required(),
        })

        return validationSchema.validate(req);
    }

    static loginValidation(req) {
        const validationSchema = Joi.object({
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(8).required(),
        })

        return validationSchema.validate(req);
    }
}

module.exports = { DataValidation }